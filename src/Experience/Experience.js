import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Connection from "./Utils/Connection.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Debug from "./Utils/Debug.js";
import StatsUtils from "./Utils/Stats.js";
import Physics from "./Utils/Physics.js";
import SoundManager from "./Utils/SoundManager.js";
import MobileData from "./Utils/MobileData.js";
import Animate from "./Utils/Animate.js";
import Fireworks from "./World/Effects/Fireworks.js";

console.log(sources);
let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    // console.log("Experience initialized");

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
    // Permet de gerer les resources 3D qui sont loadées
    this.resources = new Resources(sources);
    // Permet de gérer les données reçues depuis le mobile
    this.mobileData = new MobileData();
    // Permet de gerer la camera
    this.camera = new Camera();
    // Permet de gerer le renderer
    this.renderer = new Renderer();
    // Permet de gerer le monde 3D (ajout des elements 3D dans la scene)
    this.world = new World();
    // Permet de gerer la connexion WebSocket
    this.physics = new Physics();
    // Permet de gerer le sound
    this.soundManager = new SoundManager();
    // Fireworks effect
    this.fireworks = new Fireworks();

    this.animate = new Animate();

    this.connection = new Connection();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // webSocket Events
    this.connection.on("connected", () => {});
    this.connection.on("message", () => {
      const messages = this.connection.receivedMessages;
    });

    // Tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.stats.stats.begin();
    // console.log("Experience update");
    this.animate.update();
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.physics.update(this.time.delta);
    this.stats.stats.end();
    this.soundManager.update();
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
        // console.log(child);
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
