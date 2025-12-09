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
    console.log("Outro start from Outro");
    this.createDebug();
  }

  end() {
    console.log("Outro end called - from Outro");
    this.destroyDebug();
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
