import Experience from "../../Experience";
import Physics from "../../Utils/Physics.js";
import SceneGround from "./SceneGround.js";
import ScenePodium from "./ScenePodium.js";

export default class SceneHitBox {
  constructor() {
    console.log("SceneHitBox initialized");

    // this.experience = new Experience();
    // this.scene = this.experience.scene;
    // this.debug = this.experience.debug;

    // this.physics = new Physics();
    // this.world = this.physics.world;
    // this.defaultMaterial = this.physics.defaultMaterial;
    // this.objectsToUpdate = this.physics.objectsToUpdate;

    this.create();
  }
  create() {
    this.sceneGround = new SceneGround();
    this.scenePodium = new ScenePodium();
  }

  update() {
    this.sceneGround.update();
    this.scenePodium.update();
  }
}
