import MeshHitBox from "../../../../../Utils/MeshHitBox.js";
import Experience from "../../../../../Experience.js";
import Physics from "../../../../../Utils/Physics.js";

export default class SpeakerRectPurple {
  constructor() {
    // setupt the experience - get the sounds and resources
    this.experience = new Experience();
    this.resource = this.experience.resources.items.SpeakerRectPurple;
    // setupt the physicWorld - get the materials
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.positions = { x: 3, y: 10, z: 1.3 };
    this.scale = { x: 2, y: 2, z: 2 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.5;
    this.name = "SpeakerRectPurple";
    this.hitBoxType = "box";
    this.activatePhysics = true;
    this.material = this.physics.slipperyContactMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.spring2;
    this.music = this.experience.soundManager.soundLibrary.orange.orange5;
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
      this.sound,
    );

    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
      music: this.music,
    };
  }
}
