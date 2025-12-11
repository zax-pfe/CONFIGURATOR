import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class Speaker3Textured {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.Speaker3TexturedModel;
    // setupt the physicWorld
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.scale = { x: 3, y: 3, z: 3 };
    this.rotation = { x: 0, y: -2, z: 0 };
    this.mass = 0.5;
    this.name = "Speaker3Textured";
    this.hitBoxType = "cylinder";
    this.material = this.physics.stickyMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.bamboo;
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
