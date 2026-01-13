import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";

export default class ShowExperience extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.soundManager = this.experience.soundManager;
    this.connection = this.experience.connection;
    this.publicManager = this.experience.world.publicManager;
  }

  start() {
    console.log("Show Experience start from ShowExperience");
    this.soundManager.playSelectedMusics();
    this.publicManager.publicCount = 0;
    this.publicManager.publicCreationLoop();
    this.createDebug();
  }

  end() {
    this.soundManager.stopSelectedMusics();
    this.soundManager.selectedObjectsMusic = {};

    console.log("Show Experience end called - from ShowExperience");
    this.trigger("showExperienceEnd");
    this.publicManager.endCreationLoop();
    this.destroyDebug();
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("ShowExperience");

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
