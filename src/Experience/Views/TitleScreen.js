import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
// cette vue, affiche l'ecran titre de l'experience
// avec le logo et le bouton pour commencer l'experience
// ecoute le telephone -> si start, lance la prochaine scene (introduction)

export default class TitleScreen extends EventEmitter {
  constructor() {
    super();
    // console.log("TitleScreen initialized");
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.connection = this.experience.connection;

    // this.connection.on("message", (data) => {
    //   if (data === "start") {
    //     this.end();
    //   }
    // });
  }

  start() {
    console.log("TitleScreen start from TitleScreen");
    this.createDebug();
  }

  end() {
    console.log("TitleScreen end called - from TitleScreen");
    this.destroyDebug();
    this.trigger("titleScreenEnd");
  }

  createDebug() {
    if (this.experience.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("TitleScreen");

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
