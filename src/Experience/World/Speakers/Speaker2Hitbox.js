import MeshHitBox from "../../Utils/MeshHitBox.js";
import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";

export default class Speaker2Hitbox {
  constructor() {
    // setupt the experience - get the sounds and resources
    this.experience = new Experience();
    this.resource = this.experience.resources.items.Speaker1CenteredModel;

    // setupt the physicWorld - get the materials
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.positions = { x: 3, y: 10, z: 1.3 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.5;
    this.name = "Speaker1Hitbox";
    this.hitBoxType = "cylinder";
    this.activatePhysics = true;
    this.material = this.physics.slipperyMaterial;
    this.sound = this.experience.soundManager.bambooHitSound;
  }

  create() {
    this.MeshHitBox = new MeshHitBox(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.mass,
      this.material,
      this.hitBoxType,
      this.name,
      this.activatePhysics,
      this.sound
    );

    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
    };
  }
}
