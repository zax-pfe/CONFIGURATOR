import * as THREE from "three";
import Experience from "../Experience.js";
import Physics from "../Utils/Physics.js";
import * as CANNON from "cannon-es";
import { threeToCannon, ShapeType } from "three-to-cannon";

export default class TestAutoBox {
  constructor() {
    //setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    this.resources = this.experience.resources.items.Speaker1CenteredModel;

    this.positions = { x: 0, y: 10, z: -5 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.1;
    this.name = "SpeakerTwo";
    this.setModel();
    // this.createHitBox();
    this.createComplexHitBox();
    this.addToWorld();
    console.log("TestAutoBox initialized");
  }

  setModel() {
    this.model = this.resources.scene;
    this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
    this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.model.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  createHitBox() {
    const box = new THREE.Box3().setFromObject(this.model);
    const size = new THREE.Vector3();
    box.getSize(size);
    console.log("Hitbox size:", size);

    const shape = new CANNON.Box(
      new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)
    );

    this.body = new CANNON.Body({ mass: this.mass });
    this.body.addShape(shape);

    const center = new THREE.Vector3();
    box.getCenter(center);
    this.body.position.set(center.x, center.y, center.z);
  }

  createComplexHitBox() {
    const result = threeToCannon(this.model, { type: ShapeType.BOX });

    this.body = new CANNON.Body({ mass: this.mass });
    this.body.addShape(result.shape);
    this.body.position.copy(this.model.position);

    this.body.quaternion.copy(this.model.quaternion);
  }

  addToWorld() {
    this.world.addBody(this.body);
    this.objectsToUpdate.push({
      mesh: this.model,
      body: this.body,
    });
  }
}
