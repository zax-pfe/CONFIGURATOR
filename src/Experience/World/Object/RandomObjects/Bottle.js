import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class BottleHitbox {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.BottleModel;

    // setupt the physicWorld
    this.physics = new Physics();

    this.setup();
  }

  setup() {
    this.positions = { x: -4.5, y: 10, z: -3.5 };
    this.scale = { x: 0.5, y: 0.5, z: 0.5 };
    this.rotation = { x: 0, y: 0.8, z: 0 };
    this.mass = 0.5;
    this.name = "Bottle";
    this.hitBoxType = "cylinder";
    // set this paramreter to false to be able
    // to have the debug activate and change
    // the parameters of the object
    this.activatePhysics = true;
    this.material = this.physics.defaultContactMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.hit;
    // console.log("Bottle hit sound", this.sound);
    this.music = null;
    // this.music = this.experience.soundManager.soundLibrary.drums.alternate;
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
      this.music
    );
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
      music: this.music,
    };
  }
}
