import Experience from "../../Experience.js";
import Physics from "../../Utils/Physics.js";
import Mesh from "../../Utils/Mesh.js";

export default class ConeLumiere {
  constructor(positions = { x: -4.5, y: -2.8, z: 0 }, debug = false) {
    // setupt the experience
    this.experience = new Experience();
    this.resource = this.experience.resources.items.ConeLumiere;
    this.positions = positions;
    this.setup(positions);
    this.debug = debug;
    // if (debug) {
    //   this.debug = this.experience.debug;
    //   this.createDebug();
    // }
    this.create();
  }

  setup(position) {
    this.positions = position;
    this.scale = { x: 1.5, y: 3, z: 1.5 };
    this.rotation = { x: 0, y: 3.14 / 2, z: 0 };
    this.name = "ConeLumiere";
  }

  create() {
    this.mesh = new Mesh(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.name,
      this.debug,
    );
  }

  // createDebug() {
  //   if (this.debug.active) {
  //     this.debugFolder = this.debug.ui.addFolder(this.name);
  //     this.debugFolder.add(this.positions, "x", -110, 110, 0.1).name("posX");
  //     this.debugFolder.add(this.positions, "y", -110, 110, 0.1).name("posY");
  //     this.debugFolder.add(this.positions, "z", -110, 110, 0.1).name("posZ");
  //   }
  // }

  update() {
    this.mesh.model.rotation.y += 0.01;
    // this.mesh.update();
    // if (this.mesh) {
    //   this.mesh.positions.set(
    //     this.positions.x,
    //     this.positions.y,
    //     this.positions.z,
    //   );
    // }
  }
}
