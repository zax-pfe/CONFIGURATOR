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
    this.positions = { x: -4, y: 10, z: 0.9 };
    this.scale = { x: 3, y: 3, z: 3 };
    this.rotation = { x: 0, y: -2, z: 0 };
    this.mass = 0.5;
    this.name = "Speaker3Textured";
    this.hitBoxType = "cylinder";
    // set this paramreter to false to be able
    // to have the debug activate and change
    // the parameters of the object
    this.activatePhysics = true;
    this.material = this.physics.stickyMaterial;
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
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
    };
  }
}
