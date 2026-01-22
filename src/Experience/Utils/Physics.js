import EventEmitter from "./EventEmitter.js";
import * as CANNON from "cannon-es";
import Experience from "../Experience.js";
import CannonDebugger from "cannon-es-debugger";

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
    // console.log("Physics initialized");
    this.world = new CANNON.World();
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;

    this.world.gravity.set(0, -7, 0);
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
        activeHitBox: () => {
          CannonDebugger(this.scene, this.world.bodies);
        },
      };

      this.debugFolder.add(debugObject, "activeHitBox");

      this.debugFolder.add(debugObject, "reset");
    }
  }

  setUpMaterial() {
    this.defaultMaterial = new CANNON.Material("default");
    this.slipperyMaterial = new CANNON.Material("slippery");
    this.plasticMaterial = new CANNON.Material("plastic");
    this.stickyMaterial = new CANNON.Material("sticky");
  }

  setUpContactMaterial() {
    // default contact material
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

    // slippery contact material
    this.slipperyContactMaterial = new CANNON.ContactMaterial(
      this.slipperyMaterial,
      this.defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.3,
      }
    );

    this.world.addContactMaterial(this.slipperyContactMaterial);
    this.world.slipperyContactMaterial = this.slipperyContactMaterial;

    // plastic contact material
    this.plasticContactMaterial = new CANNON.ContactMaterial(
      this.plasticMaterial,
      this.defaultMaterial,
      {
        friction: 0.6,
        restitution: 0.9,
      }
    );

    this.world.addContactMaterial(this.plasticContactMaterial);
    this.world.plasticContactMaterial = this.plasticContactMaterial;

    // sticky contact material
    this.stickyContactMaterial = new CANNON.ContactMaterial(
      this.stickyMaterial,
      this.defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.1,
      }
    );

    this.world.addContactMaterial(this.stickyContactMaterial);
    this.world.stickyContactMaterial = this.stickyContactMaterial;
  }

  update(deltaTime) {
    this.world.step(1 / 100, deltaTime, 3);
    for (const object of this.objectsToUpdate) {
      // console.log(
      //   "Updating object:",
      //   object,
      //   object.mesh.position,
      //   object.body.position
      // );

      object.mesh.position.copy(object.body.position);
      object.mesh.quaternion.copy(object.body.quaternion);
    }
  }
}
