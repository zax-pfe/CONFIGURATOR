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

  // displayPicture() {}

  // displayPictureCanvas() {}

  displayPicture(
    divClass,
    screenshotSrc = "images/testScreenImage.png",
    cadreSrc = "images/cadre-photo.png",
    screenshotAlt = "screenshot",
    cadreAlt = "cadre",
    position = { x: 40, y: 40 },
    angle = 0
  ) {
    // wrapper principal
    const showPicture = document.createElement("div");
    showPicture.className = `show-picture ${divClass}`;

    // container relatif
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    // image cadre
    const cadre = document.createElement("img");
    cadre.className = "cadre";
    cadre.src = cadreSrc;
    cadre.alt = cadreAlt;

    // image screenshot
    const screenshot = document.createElement("img");
    screenshot.className = "screenshot";
    screenshot.src = screenshotSrc;
    screenshot.alt = screenshotAlt;

    // assemblage
    imageContainer.appendChild(cadre);
    imageContainer.appendChild(screenshot);
    showPicture.appendChild(imageContainer);

    // showPicture.style.position = "absolute";
    showPicture.style.left = `${position.x}px`;
    showPicture.style.top = `${position.y}px`;
    showPicture.style.transform = `rotate(${angle}deg)`;

    document.body.appendChild(showPicture);
    // return showPicture;
  }
}
