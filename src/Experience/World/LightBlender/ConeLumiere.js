import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";
import Mesh from "../../Utils/Mesh.js";

export default class ConeLumiere {
  constructor(positions = { x: -4.5, y: -2.8, z: 0 }) {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.ConeLumiere;

    this.setup(positions);
    this.create();
  }

  setup(position) {
    this.positions = position;
    this.scale = { x: 2, y: 2, z: 2 };
    this.rotation = { x: 0, y: 3.14 / 2, z: 0 };
    this.name = "ConeLumiere";
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

  update() {
    this.Mesh.model.rotation.y += 0.01;
  }
}
