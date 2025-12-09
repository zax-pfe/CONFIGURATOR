import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";
export default class Star {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.StarModel;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
  }

  setup() {
    this.positions = { x: -0.7, y: 10, z: -2.1 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -3.14, z: 0 };
    this.mass = 0.5;
    this.name = "Star";
    this.hitBoxType = "hull";
    this.activatePhysics = true;
    this.material = this.physics.defaultMaterial;
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
