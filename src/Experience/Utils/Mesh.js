import * as THREE from "three";
import Experience from "../Experience.js";

// CETTE CLASSE PERMET D'AJOUTER UN MODEL 3D SANS HITBOX

export default class Mesh {
  constructor(positions, scale, rotation, resources, name) {
    //setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setUp local parameters
    this.resources = resources;
    // this.positions = positions;
    // default position for non physics objects
    this.positions = positions;
    this.scale = scale;
    this.scaleRatio = 1;
    this.rotation = rotation;
    this.name = name;
    this.addShadow = true;

    this.createDebug();
    console.log("Object with hitbox initialized", this.name);

    this.setModel();
    if (this.addShadow) {
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
      });
    }
  }

  setModel() {
    this.model = this.resources.scene.clone();
    this.model.scale.set(
      this.scale.x * this.scaleRatio,
      this.scale.y * this.scaleRatio,
      this.scale.z * this.scaleRatio
    );
    this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.model.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
  }

  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(this.name);
      this.debugFolder
        .add(this.rotation, "y", -Math.PI, Math.PI, 0.01)
        .name("rotY");
      this.debugFolder.add(this.positions, "x", -10, 10, 0.1).name("posX");
      this.debugFolder.add(this.positions, "y", -10, 10, 0.1).name("posY");
      this.debugFolder.add(this.positions, "z", -10, 10, 0.1).name("posZ");
      this.debugFolder.add(this, "scaleRatio", 0.1, 5, 0.1).name("scaleRatio");
    }
  }

  update() {
    // Update c'est uniquement pour mettre a jour les elements dans le debug UI
    this.model.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    this.model.scale.set(
      this.scale.x * this.scaleRatio,
      this.scale.y * this.scaleRatio,
      this.scale.z * this.scaleRatio
    );
    this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
  }
}
