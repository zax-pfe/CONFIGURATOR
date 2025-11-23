import EventEmitter from "./EventEmitter.js";
import * as CANNON from "cannon-es";
import Experience from "../../experience/experience.js";

let instance = null;

export default class Physics extends EventEmitter {
  constructor() {
    if (instance) {
      return instance;
    }
    super();
    instance = this;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    console.log("Physics initialized");
    this.world = new CANNON.World();
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;
    this.world.gravity.set(0, -9.82, 0);
    this.setUpMaterial();
    this.setUpContactMaterial();

    this.objectsToUpdate = [];

    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Physics");
      const debugObject = {
        reset: () => {
          console.log("Resetting physics world");
          for (const object of this.objectsToUpdate) {
            //remove body
            this.world.removeBody(object.body);

            // remove mesh
            this.scene.remove(object.mesh);
          }
          this.objectsToUpdate.splice(0, this.objectsToUpdate.length);
        },
      };

      this.debugFolder.add(debugObject, "reset");
    }
  }

  setUpMaterial() {
    this.defaultMaterial = new CANNON.Material("default");
  }

  setUpContactMaterial() {
    this.defaultContactMaterial = new CANNON.ContactMaterial(
      this.defaultMaterial,
      this.defaultMaterial,
      {
        friction: 0.8,
        restitution: 0.4,
      }
    );

    this.world.addContactMaterial(this.defaultContactMaterial);
    this.world.defaultContactMaterial = this.defaultContactMaterial;
  }

  update(deltaTime) {
    this.world.step(1 / 60, deltaTime, 3);
    for (const object of this.objectsToUpdate) {
      object.mesh.position.copy(object.body.position);
      object.mesh.quaternion.copy(object.body.quaternion);
    }
  }
}
