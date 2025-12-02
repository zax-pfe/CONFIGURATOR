import MeshHitBox from "../../Utils/MeshHitBox.js";
import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";

export default class Speaker4Hitbox {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.Speaker4CenteredModel;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: -1, y: 8, z: -10 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -2, z: 0 };
    this.mass = 3;
    this.name = "Speaker4Hitbox";
    this.hitBoxType = "box";
    // set this paramreter to false to be able
    // to have the debug activate and change
    // the parameters of the object
    this.activatePhysics = true;
    this.material = this.physics.slipperyMaterial;
    this.sound = this.experience.soundManager.punchSound;
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
