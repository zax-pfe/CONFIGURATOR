import Experience from "../Experience";
import * as THREE from "three";
import StarTest from "./Object/Star/StarTest";

export default class Public {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.startest = new StarTest();

    this.dimmensions = { width: 0.5, height: 2, depth: 1 };

    this.setGeometry();
    this.setMaterial();
  }

  setGeometry() {
    // this.geometry = new THREE.BoxGeometry(
    //   this.dimmensions.width,
    //   this.dimmensions.height,
    //   this.dimmensions.depth
    // );

    const result = this.startest.create();
    // this.startest.setAnimation(result);

    this.model = result.model;

    // this.update = result.update;

    // this.animationState = result.animationState;

    // this.startest.animationState.play("dance");
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#0fed1e",
      wireframe: false,
    });
  }

  // createMesh(position) {
  //   // creer un mesh de public a la position et rotation donnée
  //   const mesh = new THREE.Mesh(this.geometry, this.material);
  //   mesh.position.set(position.x, position.y, position.z);
  //   return mesh;
  // }
}
