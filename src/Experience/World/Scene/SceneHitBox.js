import Experience from "../../Experience";
import Physics from "../../Utils/Physics.js";

export default class SceneHitBox {
  constructor() {
    console.log("SceneHitBox initialized");

    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;
    this.defaultMaterial = this.physics.defaultMaterial;
    this.objectsToUpdate = this.physics.objectsToUpdate;
  }
}
