import Experience from "../Experience.js";
import Environement from "./Environement.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import DiscoBall from "./DiscoBall.js";
import Ground from "./Ground.js";
import PhysicsBall from "./PhysicsBall.js";
import SpeakerOne from "./SpeakerOne.js";
import SpeakerTwo from "./SpeakerTwo.js";
import SpeakerThree from "./SpeakerThree.js";
import SpeakerFour from "./SpeakerFour.js";
import TestAutoBox from "./TestAutoBox.js";

// World va permettre d'integrer tout les elements 3D dans la scene

export default class World {
  constructor() {
    // Lorsqu'on crée une experience, en fait on recupere l'instance de Experience deja crée
    // Ce qui nous permet d'acceder a la scene, au ressources, a la camera, au renderer etc...
    this.experience = new Experience();
    console.log("World initialized");
    this.scene = this.experience.scene;

    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // );
    // this.scene.add(testMesh);

    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      // this.discoBall = new DiscoBall();
      this.ground = new Ground(
        { x: 0, y: 0, z: 0 },
        { x: -Math.PI * 0.5, y: 0, z: 0 }
      );
      this.ground = new Ground(
        { x: 0, y: 0, z: -7 },
        { x: -Math.PI * 0.2, y: 0, z: 0 }
      );
      this.physicsBall = new PhysicsBall();

      // this.speaker = new Speaker([0, 2, 0], [0.01, 0.01, 0.01]);
      // this.speakerOne = new SpeakerOne();
      this.autoBox = new TestAutoBox();
      // this.speakerTwo = new SpeakerTwo();
      // this.speakerThree = new SpeakerThree();
      // this.speakerFour = new SpeakerFour();
      // this.floor = new Floor();
      // this.fox = new Fox();
      this.environement = new Environement();
    });
  }

  update() {
    // if (this.fox) {
    //   this.fox.update();
    // }
    if (this.speakerOne) {
      this.speakerOne.PhysicMesh.update();
    }
    if (this.speakerTwo) {
      this.speakerTwo.PhysicMesh.update();
    }
    if (this.speakerThree) {
      this.speakerThree.PhysicMesh.update();
    }
    if (this.speakerFour) {
      this.speakerFour.PhysicMesh.update();
    }
  }
}
