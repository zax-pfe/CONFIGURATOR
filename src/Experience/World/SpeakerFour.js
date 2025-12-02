import PhysicMesh from "../Utils/PhysicMesh";
import Experience from "../Experience.js";

export default class SpeakerFour {
  constructor() {
    console.log("SpeakerFour initialized");
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.Speaker4CenteredModel;
    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: -4, y: 4, z: 4 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.1;
    this.name = "SpeakerFour";
    this.hitBoxData = {
      height: 1,
      width: 2,
      depth: 2.6,
      shiftX: 0,
      shiftY: 0,
      shiftZ: 0,
    };
    this.activatePhysics = true;
    this.addWireFrame = true;
  }

  create() {
    this.PhysicMesh = new PhysicMesh(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.mass,
      this.name,
      this.hitBoxData,
      this.activatePhysics,
      this.addWireFrame
    );
    this.PhysicMesh.create();
  }
}
