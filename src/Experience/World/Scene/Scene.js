import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";
import Mesh from "../../Utils/Mesh.js";

export default class Scene {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.resource = this.experience.resources.items.SceneFinalModel;
    this.resource = this.experience.resources.items.sceneV4;

    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: 0, y: -2, z: 0 };
    this.scale = { x: 0.6, y: 0.6, z: 0.6 };
    this.rotation = { x: 0, y: 3.14 / 2, z: 0 };
    this.name = "Scene";
  }

  create() {
    this.Mesh = new Mesh(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.name
    );
  }
}
