import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class ChoppeHitbox {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.ChoppeModel;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
  }

  setup() {
    this.positions = { x: 6.1, y: 10, z: -3.5 };
    this.scale = { x: 1.5, y: 1.5, z: 1.5 };
    this.rotation = { x: 0, y: -0.8, z: 0 };
    this.mass = 1.5;
    this.name = "Choppe";
    this.hitBoxType = "box";
    this.material = this.physics.plasticMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.bamboo;
    this.music = this.experience.soundManager.soundLibrary.drums.regular;

    console.log("Choppe hitbox sound set to:", this.sound);
  }

  create() {
    this.MeshHitBox = new MeshHitBox(
      this.scale,
      this.rotation,
      this.resource,
      this.mass,
      this.material,
      this.hitBoxType,
      this.name,
      this.sound,
      null,
      this.music
    );
    // this.MeshHitBox.playMusic();
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
      music: this.music,
    };
  }
}
