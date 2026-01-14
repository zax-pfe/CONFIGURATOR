import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";

export default class Outro extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.size = this.experience.sizes;
    this.pictureManager = this.experience.pictureManager;
    this.debug = this.experience.debug;
    this.connection = this.experience.connection;
  }

  start() {
    this.titleDiv = document.createElement("div");
    this.titleDiv.innerHTML = "Outro";
    this.titleDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5rem;
      color: white;
      text-align: center;
      z-index: 30;
    `;
    document.body.appendChild(this.titleDiv);

    this.pictureManager.pictures.forEach((dataURL) => {
      const img = document.createElement("img");
      img.src = dataURL;
      img.style.width = "500px";
      img.style.margin = "8px";
      img.style.position = "absolute";
      img.style.zIndex = "30";

      // Générer un angle aléatoire entre -30 et +30 degrés
      const angle = Math.random() * 60 - 30; // Math.random() * (max - min) + min
      img.style.transform = `rotate(${angle}deg)`;

      const top = Math.random() * this.size.height - 250;
      const left = Math.random() * this.size.width - 250;
      img.style.top = `${top}px`;
      img.style.left = `${left}px`;

      document.body.appendChild(img);
    });

    this.createDebug();
  }

  end() {
    this.destroyDebug();
    if (this.titleDiv) {
      document.body.removeChild(this.titleDiv);
      this.titleDiv = null;
    }
    this.trigger("outroEnd");
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Outro");

      const debugObject = {
        pass: () => {
          this.end();
        },
      };
      this.debugFolder.add(debugObject, "pass");
    }
  }

  destroyDebug() {
    if (this.debugFolder) {
      this.debugFolder.destroy();
      this.debugFolder = null;
    }
  }
}
