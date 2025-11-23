import Experience from "../Experience.js";
import Environement from "./Environement.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import DiscoBall from "./DiscoBall.js";
import Ground from "./Ground.js";
import PhysicsBall from "./PhysicsBall.js";
import Speaker from "./Speaker.js";

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

    this.ressources = this.experience.ressources;

    this.ressources.on("ready", () => {
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

      this.speaker = new Speaker();

      // this.floor = new Floor();
      // this.fox = new Fox();
      this.environement = new Environement();
    });
  }

  update() {
    // if (this.fox) {
    //   this.fox.update();
    // }
  }
}
