import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";
import Mesh from "../../Utils/Mesh.js";

export default class FloorLight {
  constructor(positions = { x: -4.5, y: -2.8, z: 0 }) {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.lampeSol;
    console.log("resource floor light", this.resource);
    this.setup(positions);
    this.create();
  }

  setup(position) {
    this.positions = position;
    this.scale = { x: 10, y: 10, z: 10 };
    this.rotation = { x: 0, y: 3.14 / 2, z: 0 };
    this.name = "FloorLight";
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
