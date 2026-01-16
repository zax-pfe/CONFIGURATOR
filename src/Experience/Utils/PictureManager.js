import Experience from "../Experience";
import * as THREE from "three";
import EventEmitter from "../Utils/EventEmitter.js";

export default class PictureManager extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer.instance;
    this.pictures = [];
    this.overlayImages = ["images/cadre-photo.png"]; // Ajouter les chemins des images d'overlay ici
    this.testImage = "images/testScreenImage.png"; // Image de test
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
  displayPicture() {
    // prendre l'image overlay
    // créer une div pour afficher l'image
    // creer un canvas pour combiner les deux images
    // const overlayImage = new Image();
    // overlayImage.src = this.overlayImages[0]; // Utiliser la première image d'overlay pour l'instant
    // overlayImage.onload = () => {
    //   const canvas = document.createElement("canvas");
    //   const context = canvas.getContext("2d");

    this.imageDiv = document.createElement("div");
    this.imageDiv.style.cssText = `
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 30;
    `;
    document.body.appendChild(this.imageDiv);
  }

  displayPictureCanvas() {
    console.log("Displaying picture with overlay");
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
      z-index: 1000;
    `;
    const context = canvas.getContext("2d");

    const cadre = new Image();
    const screenShot = new Image();

    cadre.src = this.overlayImages[0];
    screenShot.src = this.testImage;

    cadre.onload = () => {
      // canvas.width = cadre.width;
      canvas.width = 500;

      canvas.height = cadre.height;

      context.drawImage(cadre, 0, 0);

      screenShot.onload = () => {
        context.drawImage(screenShot, 0, 0);
        document.body.appendChild(canvas);
      };
    };
  }
}
