import PhysicMesh from "../Utils/PhysicMesh";
import Experience from "../Experience.js";

export default class SpeakerOne {
  constructor() {
    console.log("SpeakerOne initialized");
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.Speaker2CenteredModel;
    console.log(
      "dimmensions:",
      this.resource.height,
      this.resource.width,
      this.resource.depth
    );
    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: 2, y: 10, z: 2 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: -1.6, z: 0 };
    this.mass = 0.5;
    this.name = "SpeakerOne";
    this.hitBoxData = {
      height: 1.8,
      width: 1.8,
      depth: 1.8,
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
