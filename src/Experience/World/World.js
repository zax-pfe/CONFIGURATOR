import Experience from "../Experience.js";
import Environement from "./Environement.js";
import PhysicsBall from "../World/Test/PhysicsBall.js";
import GenerateRandomCube from "../World/Test/GenerateRandomCube.js";
import ControlManager from "../Utils/ControlManager.js";
import Scene from "./Scene/Scene.js";
import Light from "./LightBlender/Light.js";
import PublicManager from "./PublicManager.js";
import FloorLight from "./Scene/FloorLight.js";
import SceneHitBox from "./Scene/SceneHitBox.js";

// World va permettre d'integrer tout les elements 3D dans la scene

export default class World {
  constructor() {
    // Lorsqu'on crée une experience, en fait on recupere l'instance de Experience deja crée
    // Ce qui nous permet d'acceder a la scene, au ressources, a la camera, au renderer etc...
    this.experience = new Experience();
    // console.log("World initialized");
    this.scene = this.experience.scene;

    this.listPhysicObjects = [];
    this.listNonPhysicObjects = [];

    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      // Permet de tester les objets physiques lancés
      // this.physicsBall = new PhysicsBall();
      // this.cubeGenerator = new GenerateRandomCube();

      // Création de la scene avec hitbox
      this.sceneHitBox = new SceneHitBox();
      this.listNonPhysicObjects.push(new Scene());
      this.listNonPhysicObjects.push(new Light({ x: -4.5, y: -2.8, z: 0 }));
      this.listNonPhysicObjects.push(new Light({ x: 45, y: -2.8, z: 0 }));
      this.listNonPhysicObjects.push(new Light({ x: 20, y: -5.6, z: -40 }));
      // this.listNonPhysicObjects.push(new FloorLight({ x: 0, y: 0, z: 0 }));

      // création du control manager -> gestion des differentes vues du projet
      this.controlManager = new ControlManager();

      // création du public
      this.publicManager = new PublicManager();

      this.environement = new Environement();
    });
  }

  update() {
    if (this.sceneHitBox) {
      this.sceneHitBox.update();
    }

    if (this.publicManager) {
      this.publicManager.update();
    }

    for (const object of this.listNonPhysicObjects) {
      object.Mesh.update();
    }
  }
}
