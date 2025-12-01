import PhysicMesh from "../Utils/PhysicMesh";
import Experience from "../Experience.js";

export default class SpeakerOne {
  constructor() {
    console.log("SpeakerOne initialized");
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.speakerCustomModel;
    this.setup();
    this.create();
  }

  setup() {
    this.positions = { x: 0, y: 2, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.rotation = { x: 0, y: Math.PI, z: 0 };
    this.mass = 1;
    this.name = "SpeakerOne";
    this.hitBoxData = {
      height: 4.5,
      width: 3,
      depth: 2.3,
      shiftX: 0.1,
      shiftY: 2,
      shiftZ: 0,
    };
    this.activatePhysics = true;
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
      this.activatePhysics
    );
    this.PhysicMesh.create();
  }
}
