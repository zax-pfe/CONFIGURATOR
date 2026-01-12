import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";
import lightBeam from "./lightBeam.js";
import { Vector3 } from "three";

export default class MovingSpotLightHitbox {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.SpotLightModel2;

    // setupt the physicWorld
    this.physics = new Physics();
    this.world = this.physics.world;

    this.setup();
  }

  setup() {
    this.positions = { x: 1.6, y: 10, z: -4.8 };
    this.scale = { x: 0.75, y: 0.75, z: 0.75 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.mass = 0.5;
    this.name = "MovingSpotLight";
    this.hitBoxType = "box";

    this.material = this.physics.stickyMaterial;
    this.sound = this.experience.soundManager.punchSound;
  }

  create() {
    this.MeshHitBox = new MeshHitBox(
      this.scale,
      this.rotation,
      this.resource,
      this.mass,
      this.material,
      this.hitBoxType,
      this.name,
      this.sound,
      null
    );
    this.lightMesh = new lightBeam(this.MeshHitBox.model, {
      color: "pink",
      direction: new Vector3(-0.725, -1, 0),
      radiusTop: 0.02,
      spreadRatio: 0.175,
      height: 20,
      laser: false,
    });
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
      lightBeam: this.lightMesh,
    };
  }
}
