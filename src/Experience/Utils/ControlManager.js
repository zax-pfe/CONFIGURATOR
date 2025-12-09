import EventEmitter from "./EventEmitter";
import TitleScreen from "../Views/TitleScreen";
import Introduction from "../Views/Introduction";
import SelectAndLaunch from "../Views/SelectAndLaunch";
import ShowExperience from "../Views/ShowExperience";
import Outro from "../Views/Outro";
// cette classe prend les differentes scene de l'experience
// ecoute cette scene,
// et passe d'une scene a l'autre selon les event renvoyés par les scenes

export default class ControlManager extends EventEmitter {
  constructor() {
    super();
    // console.log("ControlManager initialized");
    this._titleScreen = new TitleScreen();
    this._introduction = new Introduction();
    this._selectAndLaunch = new SelectAndLaunch();
    this._showExperience = new ShowExperience();
    this._outro = new Outro();

    this.currentScene = "titleScreen";

    this._titleScreen.on("titleScreenEnd", () => {
      console.log("received end of introduction");
      this.currentScene = "introduction";
      // this._introduction.start();
    });
    this._introduction.on("introductionEnd", () => {
      this.currentScene = "selectAndLaunch";
      // this._selectAndLaunch.start();
    });
    this._selectAndLaunch.on("selectAndLaunchEnd", () => {
      this.currentScene = "showExperience";
      // this._showExperience.start();
    });
    this._showExperience.on("showExperienceEnd", () => {
      this.currentScene = "outro";
      // this._outro.start();
    });
    this._outro.on("outroEnd", () => {
      this.currentScene = "titleScreen";
      // this._titleScreen.start();
    });

    if (this.currentScene === "titleScreen") {
      this._titleScreen.start();
    } else if (this.currentScene === "introduction") {
      console.log("introduction start");
      this._introduction.start();
    } else if (this.currentScene === "selectAndLaunch") {
      this._selectAndLaunch.start();
    } else if (this.currentScene === "showExperience") {
      this._showExperience.start();
    } else if (this.currentScene === "outro") {
      this._outro.start();
    }
  }
}
