import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";
export default class Speaker4Hitbox {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.Speaker4CenteredModel;

    // setupt the physicWorld
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -2, z: 0 };
    this.mass = 3;
    this.name = "Speaker4Hitbox";
    this.hitBoxType = "box";
    this.material = this.physics.slipperyMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.bamboo;
    console.log("sound speaker 4 hitbox", this.sound);
  }

  create() {
    this.MeshHitBox = new MeshHitBox(
      this.scale,
      this.rotation,
      this.resource,
      this.mass,
      this.material,
      this.hitBoxType,
      this.name,
      this.sound
    );
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
    };
  }
}
