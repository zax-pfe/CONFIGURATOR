import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";

export default class SpotLightHitbox2 {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.SpotLightModel2;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
  }

  setup() {
    this.positions = { x: 1.6, y: 10, z: -4.8 };
    this.scale = { x: 1.5, y: 1.5, z: 1.5 };
    this.rotation = { x: 0, y: 0.8, z: 0 };
    this.mass = 0.5;
    this.name = "SpotLight2";
    this.hitBoxType = "box";
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
