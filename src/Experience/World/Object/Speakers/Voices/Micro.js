import MeshHitBox from "../../../../Utils/MeshHitBox.js";
import Experience from "../../../../Experience.js";
import Physics from "../../../../Utils/Physics.js";

export default class SpeakerMic1 {
  constructor() {
    // setupt the experience - get the sounds and resources
    this.experience = new Experience();
    this.resource = this.experience.resources.items.SpeakerMic;
    // setupt the physicWorld - get the materials
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.positions = { x: 3, y: 10, z: 1.3 };
    this.scale = { x: 1.5, y: 1.5, z: 1.5 };
    this.rotation = { x: 0, y: Math.PI, z: 0 };
    this.mass = 1;
    this.name = "SpeakerMic1";
    this.hitBoxType = "cylinder";
    this.activatePhysics = true;
    this.material = this.physics.defaultContactMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.spring2;
    this.music = this.experience.soundManager.soundLibrary.orange.orange4;
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
