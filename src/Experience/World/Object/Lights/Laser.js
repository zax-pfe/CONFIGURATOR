import MeshHitBox from "../../../Utils/MeshHitBox.js";
import Experience from "../../../Experience.js";
import Physics from "../../../Utils/Physics.js";
import lightBeam from "./lightBeam.js";
import { Vector3 } from "three";

export default class Laser {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resource = this.experience.resources.items.Laser;

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
    this.name = "Laser";
    this.hitBoxType = "box";
    // set this paramreter to false to be able
    // to have the debug activate and change
    // the parameters of the object
    this.activatePhysics = true;
    this.material = this.physics.plasticMaterial;
    this.sound = this.experience.soundManager.soundLibrary.hit.bamboo;
  }

  create() {
    this.MeshHitBox = new MeshHitBox(
      this.positions,
      this.scale,
      this.rotation,
      this.resource,
      this.mass,
      this.material,
      this.hitBoxType,
      this.name,
      this.activatePhysics,
      this.sound
    );
    this.lightMesh = new lightBeam(this.MeshHitBox.model, {
      color: "red",
      direction: new Vector3(0.75, 0, 0),
      radiusTop: 0.1,
      spreadRatio: 0,
      height: 50,
      laser: true,
    });
    return {
      name: this.name,
      model: this.MeshHitBox.model,
      body: this.MeshHitBox.body,
      lightBeam: this.lightMesh,
    };
  }
}
