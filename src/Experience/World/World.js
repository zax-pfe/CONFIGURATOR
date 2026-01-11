import Experience from "../Experience.js";
import Environement from "./Environement.js";
import PhysicsBall from "../World/Test/PhysicsBall.js";
import GenerateRandomCube from "../World/Test/GenerateRandomCube.js";
import ControlManager from "../Utils/ControlManager.js";
import Scene from "./Scene/Scene.js";
import Light from "./LightBlender/Light.js";

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

    // tableau qui appelle update de toutes les instances de la classe star (pour update)
    this.starInstances = [];

    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      // Permet de tester les objets physiques lancés
      // this.physicsBall = new PhysicsBall();
      // this.cubeGenerator = new GenerateRandomCube();

      this.sceneHitBox = new SceneHitBox();
      this.listNonPhysicObjects.push(new Scene());
      this.listNonPhysicObjects.push(new Light({ x: -4.5, y: -2.8, z: 0 }));
      this.listNonPhysicObjects.push(new Light({ x: 45, y: -2.8, z: 0 }));
      this.listNonPhysicObjects.push(new Light({ x: 20, y: -5.6, z: -40 }));

      this.controlManager = new ControlManager();

      this.environement = new Environement();
    });
  }

  // methode publique pour ajouter une instance de Star au tableau starInstances
  registerStarInstance(starManagerInstance) {
    this.starInstances.push(starManagerInstance);
  }

  update() {
    if (this.sceneHitBox) {
      this.sceneHitBox.update();
    }

    for (const object of this.listNonPhysicObjects) {
      object.Mesh.update();
    }

    // update chaque instance de la classe star
    for (const instance of this.starInstances){
      instance.update()
    }
  }
}
