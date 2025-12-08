import MeshHitBox from "../../Utils/MeshHitBox.js";
import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";

export default class Speaker4Textured {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.Speaker4TexturedModel;

    // setupt the physicWorld
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -2, z: 0 };
    this.mass = 3;
    this.name = "Speaker4Textured";
    this.hitBoxType = "box";
    // set this paramreter to false to be able
    // to have the debug activate and change
    // the parameters of the object
    this.activatePhysics = true;
    this.material = this.physics.slipperyMaterial;
    this.sound = this.experience.soundManager.punchSound;
  }

  create(position = { x: 0, y: 10, z: 0 }) {
    this.MeshHitBox = new MeshHitBox(
      position,
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

  delete() {}
}
