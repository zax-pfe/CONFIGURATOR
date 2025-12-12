import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
  constructor() {
    // console.log("Camera initialized");
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.mobileData = this.experience.mobileData;
    this.debug = this.experience.debug;

    this.target = new THREE.Vector3(0, 5, 0);
    this.smoothTarget = new THREE.Vector3(0, 5, 0);

    this.setInstance();
    this.setOrbitControls();
    this.createDebug();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.05,
      1000
    );
    this.instance.position.set(0, 20, 87);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;

    this.controls.enabled = true;
  }

  createDebug() {
    // Debug
    if (this.debug.active) {
      const folder = this.debug.ui.addFolder("Camera");
      this.debugObject = {
        controlsEnabled: true,
      };
      folder.add(this.debugObject, "controlsEnabled").onChange((e) => {
        this.controls.enabled = !this.controls.enabled;
        if (!e) {
          this.instance.position.set(0, 5, 87);
        }
      });
    }
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (this.debug.active && this.debugObject.controlsEnabled) {
      this.controls.update();
    } else {
      const { angleH, angleV } = this.mobileData.throwing || {};

      // convertir en radians
      const rotX = -THREE.MathUtils.degToRad(angleH);
      const rotY = THREE.MathUtils.degToRad(angleV);

      // créer quaternion cible
      const targetQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(rotY, rotX, 0)
      );

      // interpoler la rotation actuelle vers la cible
      this.instance.quaternion.slerp(targetQuat, 0.025); // 0.1 = facteur de lissage

      // appliquer la rotation au parent (la caméra)
      // this.instance.rotation.set(rotY, rotX, 0); gf
    }
  }
}
