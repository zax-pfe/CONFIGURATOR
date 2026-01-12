import Experience from "../Experience";
import * as THREE from "three";
// import StarTest from "./Object/Star/StarTest";
// import Star from "../World/Object/Stars/Star";
import RockStar from "./Object/Stars/RockStar";

export default class Public {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.public = new RockStar();

    this.experience.world.registerStarInstance(this.public);

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
    console.log("Creating public instance");
    const result = this.public.create();

    console.log("this.public.create()", result);
    this.publicInstance = result;

    console.log("result before", result);
    console.log("result", result);

    this.model = result.model;
    result.animationState = "dance";

    // this.experience.animate.objectsToAnimate.push(result);
    // this.animation = result.update;

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
