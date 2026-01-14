import Experience from "../../../Experience.js";
import Mesh from "../../../Utils/Mesh.js";

export default class Intern {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.resource = this.experience.resources.items.SceneFinalModel;
    this.resource = this.experience.resources.items.Intern;

    this.setup();
  }

  setup() {
    this.positions = { x: 20, y: -1.5, z: 0 };
    this.scale = { x: 1.5, y: 1.5, z: 1.5 };
    this.rotation = { x: 0, y: 3.14 - 0.25, z: 0 };
    this.name = "Intern";
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

  destroy(){
    this.scene.remove(this.Mesh.model)
  }
}
