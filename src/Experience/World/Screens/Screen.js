import Experience from "../../Experience";
import EventEmitter from "../../Utils/EventEmitter";
import * as THREE from "three";
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";

export default class Screen extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;

    this.positions = { x: 0, y: 1.5, z: -3 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 0.01, y: 0.01, z: 0.01 };
    this.dimmensions = { width: 100, height: 100 };

    this.createDebug();
    this.setUpDiv();
  }

  setUpDiv() {
    const div = document.createElement("div");
    div.className = "html-panel";
    div.innerHTML = `<div>Le concert va commenercer dans quelques instants...</div>`;

    div.style.background = "rgba(255, 255, 255, 0.8)";
    div.style.color = "black";
    div.style.padding = "20px";
    div.style.borderRadius = "10px";
    div.style.fontSize = "22px";
    this.htmlObject = new CSS3DObject(div);
    this.htmlObject.position.set(0, 1.5, -3);
    // this.htmlObject.rotation.set(0, 1.5, -3);
    this.htmlObject.scale.set(0.01, 0.01, 0.01);
    this.scene.add(this.htmlObject);
  }

  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Screen HTML");
      this.debugFolder.add(this.positions, "x", -40, 40, 0.1).name("posX");
      this.debugFolder.add(this.positions, "y", -40, 40, 0.1).name("posY");
      this.debugFolder.add(this.positions, "z", -40, 40, 0.1).name("posZ");
      this.debugFolder
        .add(this.rotation, "x", -Math.PI, Math.PI, 0.01)
        .name("rotX");
      this.debugFolder
        .add(this.rotation, "y", -Math.PI, Math.PI, 0.01)
        .name("rotY");
      this.debugFolder
        .add(this.rotation, "z", -Math.PI, Math.PI, 0.01)
        .name("rotZ");
      this.debugFolder.add(this.scale, "x", 0.001, 0.1, 0.001).name("scaleX");
      this.debugFolder.add(this.scale, "y", 0.001, 0.1, 0.001).name("scaleY");
      this.debugFolder.add(this.scale, "z", 0.001, 0.1, 0.001).name("scaleZ");
      this.debugFolder
        .add(this.dimmensions, "width", 1, 100, 0.1)
        .name("planeWidth");
      this.debugFolder
        .add(this.dimmensions, "height", 1, 100, 0.1)
        .name("planeHeight");
    }
  }

  update() {
    this.htmlObject.position.set(
      this.positions.x,
      this.positions.y,
      this.positions.z
    );
    this.htmlObject.rotation.set(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z
    );
    this.htmlObject.scale.set(this.scale.x, this.scale.y, this.scale.z);
  }
}
