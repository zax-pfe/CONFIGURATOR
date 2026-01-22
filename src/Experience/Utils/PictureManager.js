import Experience from "../Experience";
import * as THREE from "three";
import EventEmitter from "../Utils/EventEmitter.js";

export default class PictureManager extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer.instance;
    this.pictures = []; // Tableau pour stocker les images capturées
    this.picturesContainerHTML = []; // Tableau pour stocker les éléments HTML des images affichées
    // permet surtout de pouvoir supprimer ces images html
    this.overlayImages = ["images/cadre-photo.png"]; // chemins des images d'overlay
    this.testImage = "images/testScreenImage.png";
    this.numberOfPictures = 0;
  }

  takePicture() {
    const dataURL = this.renderer.domElement.toDataURL("image/png");
    this.pictures.push(dataURL);
    this.numberOfPictures++;
    // console.log(`Picture taken! Total pictures: ${this.numberOfPictures}`);

    // permet de télécharger l'image directement
    // const link = document.createElement("a");
    // link.href = dataURL;
    // link.download = "screenshot.png";²
    // link.click();
  }

  destroyPictures() {
    // liquide tout les images affichées
    for (const picHTML of this.picturesContainerHTML) {
      document.body.removeChild(picHTML);
    }
    this.pictures = [];
  }

  displayPicture(
    divClass,
    screenshotSrc = "images/testScreenImage.png",
    cadreSrc = "images/cadre-photo.png",
    screenshotAlt = "screenshot",
    cadreAlt = "cadre",
    position = { x: 40, y: 40 },
    angle = 0,
  ) {
    // wrapper principal
    const showPicture = document.createElement("div");
    showPicture.className = `show-picture ${divClass}`;

    // container
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

    showPicture.style.left = position.x;
    showPicture.style.top = position.y;
    // showPicture.style.transform = `rotate(${angle}deg)`;

    document.body.appendChild(showPicture);
    this.picturesContainerHTML.push(showPicture);
  }
}
