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

    // this.starInstance.model.material.visible = false;

    // this.star.setAnimation(result);

    // console.log("result", result);
    // console.log("result model", result.model);

    // this.model = result.model;
    // result.animationState = "dance";
    // // this.star.setAnimation(result);
    // this.experience.animate.objectsToAnimate.push(result);
    // this.animation = result.update;

    // this.update = result.update;

    // this.animationState = result.animationState;

    // this.star.animationState.play("dance");
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
