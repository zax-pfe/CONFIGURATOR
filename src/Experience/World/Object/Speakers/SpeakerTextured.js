import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class SpeakerTextured {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.Speaker1TexturedModel;
    // setupt the physicWorld
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.positions = { x: 0, y: 10, z: -5 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 1;
    this.name = "Speaker1Textured";
    this.hitBoxType = "box";
    this.activatePhysics = true;
    this.material = this.physics.defaultContactMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.bamboo;
    this.music = this.experience.soundManager.soundLibrary.guitar.guitar3;
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
      music: this.music,
    };
  }
}
