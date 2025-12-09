import Experience from "../Experience.js";
import Environement from "./Environement.js";
import PhysicsBall from "../World/Test/PhysicsBall.js";
import GenerateRandomCube from "../World/Test/GenerateRandomCube.js";
import ControlManager from "../Utils/ControlManager.js";
import Scene from "./Scene/Scene.js";

import SceneHitBox from "./Scene/SceneHitBox.js";

// World va permettre d'integrer tout les elements 3D dans la scene

export default class World {
  constructor() {
    // Lorsqu'on crée une experience, en fait on recupere l'instance de Experience deja crée
    // Ce qui nous permet d'acceder a la scene, au ressources, a la camera, au renderer etc...
    this.experience = new Experience();
    console.log("World initialized");
    this.scene = this.experience.scene;

    this.listPhysicObjects = [];
    this.listNonPhysicObjects = [];

    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      // Permet de tester les objets physiques lancés
      this.physicsBall = new PhysicsBall();
      this.cubeGenerator = new GenerateRandomCube();

      this.sceneHitBox = new SceneHitBox();

      // this.throwObject = new ThrowObject();
      // console.log("throwObject List", this.throwObject.items);

      this.controlManager = new ControlManager();


      // this.listPhysicObjects.push(new SpeakerHitbox());
      // this.listPhysicObjects.push(new Speaker2Hitbox());
      // this.listPhysicObjects.push(new Speaker3Hitbox());
      // this.listPhysicObjects.push(new Speaker4Hitbox());
      // this.listPhysicObjects.push(new Star());
      // this.listPhysicObjects.push(new BottleHitbox());
      // this.listPhysicObjects.push(new ChoppeHitbox());
      // this.listPhysicObjects.push(new SpotLightHitbox());
      // this.listPhysicObjects.push(new DiscoBallHitbox());

      this.listNonPhysicObjects.push(new Scene());

      this.environement = new Environement();
    });
  }

  update() {
    if (this.sceneHitBox) {
      this.sceneHitBox.update();
    }

    for (const object of this.listNonPhysicObjects) {
      object.Mesh.update();
    }
  }
}
