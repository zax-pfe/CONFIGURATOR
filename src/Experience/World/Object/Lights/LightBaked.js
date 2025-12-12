import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class LightBaked {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.lightBaked;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
  }

  setup() {
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: 0.8, z: 0 };
    this.mass = 0.5;
    this.name = "lightBaked";
    this.hitBoxType = "box";

    this.material = this.physics.stickyMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.bamboo;
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
      null
    );
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
    };
  }
}
