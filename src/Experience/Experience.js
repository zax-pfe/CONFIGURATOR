import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Connection from "./Utils/Connection.js";
import Ressources from "./Utils/Ressources.js";
import sources from "./sources.js";
import Debug from "./Utils/Debug.js";
import StatsUtils from "./Utils/Stats.js";
import Physics from "./Utils/Physics.js";
import PhysicsBall from "./World/PhysicsBall.js";

console.log(sources);
let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    console.log("Experience initialized");

    // Global access
    window.experience = this;
    this.canvas = canvas;

    // Setup
    this.stats = new StatsUtils();
    // Permet de setUp le lil-gui
    this.debug = new Debug();
    // Permet de gerer la taille de la fenetre
    this.sizes = new Sizes();
    // Permet de gerer le temps qui passe dans l'experience
    this.time = new Time();
    // Creation de la scene Three.js
    this.scene = new THREE.Scene();
    // Permet de gerer les ressources 3D qui sont loadées
    this.ressources = new Ressources(sources);
    // Permet de gerer la camera
    this.camera = new Camera();
    // Permet de gerer le renderer
    this.renderer = new Renderer();
    // Permet de gerer le monde 3D (ajout des elements 3D dans la scene)
    this.world = new World();
    // Permet de gerer la connexion WebSocket
    this.physics = new Physics();

    this.connection = new Connection();

    // this.physicsBall = new PhysicsBall(0.3, { x: 0, y: 3, z: 0 });

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // webSocket Events
    this.connection.on("connected", () => {
      console.log("WebSocket connected event received in Experience");
    });
    this.connection.on("message", () => {
      const messages = this.connection.receivedMessages;
      console.log("Received messages:", messages);
    });

    // Tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    console.log("Experience resized");
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.stats.stats.begin();
    // console.log("Experience update");
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.stats.stats.end();
    this.physics.update(this.time.delta);
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");
    // this.connection.off("connected");
    // this.connection.off("message");

    // traverse the whole scene
    this.scene.traverse((child) => {
      // dispose geometry
      if (child instanceof THREE.Mesh) {
        console.log(child);
        e;
        child.geometry.dispose();

        for (const key in child.material) {
          // const value = child.material[key];
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }

      this.camera.controls.dispose();
      this.renderer.instance.dispose();

      if (this.debug.active) {
        this.debug.ui.destroy();
      }
    });
  }
}
