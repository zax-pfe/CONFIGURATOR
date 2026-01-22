import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class Tiroir {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.tiroir;
    // setupt the physicWorld
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.positions = { x: -4.5, y: 10, z: -3.5 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: 0.8, z: 0 };
    this.mass = 0.5;
    this.name = "Tiroir";
    this.hitBoxType = "box";
    this.activatePhysics = true;
    this.material = this.physics.defaultContactMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.hit;
    this.music = this.experience.soundManager.soundLibrary.rose.rose2;
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
      null,
      this.music,
    );
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
      music: this.music,
    };
  }
}
