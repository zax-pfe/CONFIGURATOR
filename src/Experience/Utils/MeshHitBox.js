import * as THREE from "three";
import Experience from "../Experience.js";
import Physics from "../Utils/Physics.js";
import * as CANNON from "cannon-es";
import { threeToCannon, ShapeType } from "three-to-cannon";

// prend en parametre modele glb
// default position, scale, rotation, mass, default material

export default class MeshHitBox {
  constructor(
    positions,
    scale,
    rotation,
    resources,
    mass,
    material,
    hitBoxType,
    name,
    activetePhysics
  ) {
    //setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;

    // setUp local parameters
    this.resources = resources;
    this.positions = positions;
    this.scale = scale;
    this.rotation = rotation;
    this.mass = mass;
    this.material = material;
    this.name = name;
    this.hitBoxType = hitBoxType;
    this.activetePhysics = activetePhysics;

    // create the model
    this.setModel();
    this.createComplexHitBox();
    // this.createHitBox();
    this.addToPhysicWorld();
    console.log("Object with hitbox initialized", this.name);
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
    // create a box hitbox around the model with native function
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
    let result = null;
    if (this.hitBoxType === "cylinder") {
      result = threeToCannon(this.model, { type: ShapeType.CYLINDER });
    } else if (this.hitBoxType === "sphere") {
      result = threeToCannon(this.model, { type: ShapeType.SPHERE });
    } else {
      result = threeToCannon(this.model, { type: ShapeType.BOX });
    }

    this.body = new CANNON.Body({ mass: this.mass });
    this.body.addShape(result.shape);
    this.body.position.copy(this.model.position);
    this.body.quaternion.copy(this.model.quaternion);
  }

  addToPhysicWorld() {
    this.world.addBody(this.body);
    this.objectsToUpdate.push({
      mesh: this.model,
      body: this.body,
    });
  }
}
