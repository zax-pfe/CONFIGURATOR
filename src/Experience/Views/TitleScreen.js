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
    // Create the title screen div
    this.titleDiv = document.createElement("div");
    // this.titleDiv.innerHTML = "Title screen";
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
    // Remove the title screen div when ending
    if (this.titleDiv) {
      document.body.removeChild(this.titleDiv);
      this.titleDiv = null;
    }
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
