import Experience from "../Experience";
import * as THREE from "three";
import EventEmitter from "../Utils/EventEmitter.js";

export default class PictureManager extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer.instance;
    this.pictures = [];
  }

  takePicture() {
    const dataURL = this.renderer.domElement.toDataURL("image/png");
    this.pictures.push(dataURL);
    console.log("Picture taken, total pictures:", this.pictures.length);

    // const link = document.createElement("a");
    // link.href = dataURL;
    // link.download = "screenshot.png";
    // link.click();
  }
}
