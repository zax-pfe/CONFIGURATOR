import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";

export default class Outro extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
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
      z-index: 1000;
    `;
    document.body.appendChild(this.titleDiv);
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
