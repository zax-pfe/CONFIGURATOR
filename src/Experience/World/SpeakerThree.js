import PhysicMesh from "../Utils/PhysicMesh";
import Experience from "../Experience.js";

export default class SpeakerThree {
  constructor() {
    console.log("SpeakerThree initialized");
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.Speaker3CenteredModel;
    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: 4, y: 4, z: 4 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.5;
    this.name = "SpeakerThree";
    this.hitBoxData = {
      height: 2.5,
      width: 1.4,
      depth: 1.4,
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
