import MeshHitBox from "../../Utils/MeshHitBox.js";
import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";

export default class Speaker2Hitbox {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.Speaker1CenteredModel;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: 3, y: 4.3, z: 1.3 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.5;
    this.name = "Speaker1Hitbox";
    this.hitBoxType = "box";
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
  }
}
