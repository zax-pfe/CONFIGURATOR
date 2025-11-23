import * as THREE from "three";
import Experience from "../Experience";

export default class DiscoBall {
  constructor() {
    this.experience = new Experience();
    console.log("DiscoBall initialized");
    this.scene = this.experience.scene;
    this.resources = this.experience.ressources;

    //setup
    this.resource = this.resources.items.discoBall;

    console.log("ressource Disco Ball", this.resource);

    this.setTextures();
    this.setModel();
  }

  setTextures() {
    this.textures = {};
    this.textures.color = this.resources.items.discoBallColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.discoBallMetalnessTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setModel() {
    this.model = this.resource.scene;
    // this.model.scale.set(0.02, 0.02, 0.02);
    this.model.position.y = 2;
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
}
