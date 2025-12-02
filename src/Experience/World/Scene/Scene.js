import MeshHitBox from "../../Utils/MeshHitBox.js";
import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";

export default class Scene {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.SceneModel;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: 0, y: -2, z: 0 };
    this.scale = { x: 0.6, y: 0.6, z: 0.6 };
    this.rotation = { x: 0, y: 3.14 / 2, z: 0 };
    this.mass = 0;
    this.name = "Scene";
    this.hitBoxType = "hull";
    this.activatePhysics = false;
    this.material = this.physics.defaultMaterial;
    this.sound = this.experience.soundManager.bambooHitSound;
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
  }
}
