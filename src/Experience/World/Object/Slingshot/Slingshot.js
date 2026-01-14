import Experience from "../../../Experience";
import Mesh from "../../../Utils/Mesh";

export default class Slingshot {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.Slingshot;

    this.setup();
  }

  setup() {
    this.positions = { x: 0, y: -10, z: 75 };
    this.scale = { x: 2, y: 2, z: 2 };
    this.rotation = { x: 0, y: 3.14 / 2, z: 0 };
    this.name = "Slingshot";
  }

  create() {
    this.Mesh = new Mesh(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.name
    );
    return{
        name: this.name,
        model: this.Mesh.model,
    }
  }
}
