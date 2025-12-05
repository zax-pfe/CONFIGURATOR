import Experience from "../Experience.js";
import Environement from "./Environement.js";
import PhysicsBall from "./PhysicsBall.js";
import GenerateRandomCube from "./GenerateRandomCube.js";

import SpeakerHitbox from "./Speakers/SpeakerHitbox.js";
import Speaker2Hitbox from "./Speakers/Speaker2Hitbox.js";
import Speaker3Hitbox from "./Speakers/Speaker3Hitbox.js";
import Speaker4Hitbox from "./Speakers/Speaker4Hitbox.js";
import BottleHitbox from "./RandomObjects/Bottle.js";
import ChoppeHitbox from "./RandomObjects/Choppe.js";
import SpotLightHitbox from "./Lights/SpotLight.js";
import DiscoBallHitbox from "./RandomObjects/DiscoBall.js";
import Star from "./Star/Star.js";
import Scene from "./Scene/Scene.js";

import ThrowObject from "./throwObject.js";

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

    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // );
    // this.scene.add(testMesh);

    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      // this.ground = new Ground(
      //   { x: 0, y: 0, z: 0 },
      //   { x: -Math.PI * 0.5, y: 0, z: 0 }
      // );
      // this.ground = new Ground(
      //   { x: 0, y: 0, z: -7 },
      //   { x: -Math.PI * 0.2, y: 0, z: 0 }
      // );

      // Permet de tester les objets physiques lancés
      this.physicsBall = new PhysicsBall();
      this.cubeGenerator = new GenerateRandomCube();

      this.sceneHitBox = new SceneHitBox();

      this.throwObject = new ThrowObject();
      console.log("Throwable objects", this.throwObject.items);

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
    // if (this.fox) {
    //   this.fox.update();
    // }
    if (this.sceneHitBox) {
      this.sceneHitBox.update();
    }

    for (const object of this.listNonPhysicObjects) {
      object.Mesh.update();
    }
  }
}
