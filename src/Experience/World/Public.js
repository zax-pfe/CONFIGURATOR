import Experience from "../Experience";
import * as THREE from "three";
import PublicModel from "./Object/Stars/PublicModel";

export default class Public {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.star = new PublicModel();
    this.experience.world.registerStarInstance(this.star);

    this.dimmensions = { width: 0.5, height: 2, depth: 1 };

    this.setGeometry();
    this.setMaterial();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(
      this.dimmensions.width,
      this.dimmensions.height,
      this.dimmensions.depth
    );

    const result = this.star.create();
    this.starInstance = result;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#0fed1e",
      wireframe: false,
    });
  }
}
