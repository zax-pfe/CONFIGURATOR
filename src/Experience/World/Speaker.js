import * as THREE from "three";
import Experience from "../Experience.js";
import Physics from "../Utils/Physics.js";

export default class Speaker {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.ressources;
    this.debug = this.experience.debug;

    // if (this.debug.active) {
    //   this.debugFolder = this.debug.ui.addFolder("Speaker");
    // }
    // console.log(this.debug);

    console.log("Speaker initialized");

    // Setup

    console.log("Ressources items :", this.resources.items);

    this.resource = this.resources.items.speakerModel;
    this.setModel();
    this;
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.01, 0.01, 0.01);
    this.model.rotation.y = Math.PI;
    this.model.position.set(0, 1, -2);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
}
