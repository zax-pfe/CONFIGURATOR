import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class Speaker2Textured {
  constructor() {
    // setupt the experience - get the sounds and resources
    this.experience = new Experience();
    this.resource = this.experience.resources.items.Speaker2TexturedModel;

    // setupt the physicWorld - get the materials
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.5;
    this.name = "Speaker2Textured";
    this.hitBoxType = "cylinder";
    this.material = this.physics.slipperyMaterial;
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
