import EventEmitter from "./EventEmitter";

// stocke et met à jour les données reçues depuis le mobile
export default class MobileData extends EventEmitter{
  constructor() {
    super()

    this.title = {
      state: null,
    };

    this.intro = {
      state: null,
    };

    this.calibrate = {
      state: null,
    };


    this.selection = {
      state: null,
      index: null,
    };

    this.throwing = {
      state: 0,
      strength: 0,
      angleH: 0,
      angleV: 0,
    };

    this.show = {
      state: null,
    };
    
    this.outro = {
      state: null,
    };
  }

  processMobileMessage(msg) {
    if (!msg.device || msg.device !== "mobile") return;

    switch (msg.phase) {

      case "title": {
        this.title.state = msg.state;
        if (msg.state === "skip") {
          this.trigger("skipTitle");
        }
        break;
      }

      case "intro": {
        this.intro.state = msg.state;
        if (msg.state === "skip") {
          this.trigger("skipIntro");
        }
        break;
      }

      case "calibrate": {
        this.calibrate.state = msg.state;
        if (msg.state === "calibrated") {
          this.trigger("skipCalibrate");
        }
        break;
      }

      case "selection": {
        const prevState = this.selection.state;

        this.selection.state = msg.state;
        this.selection.index = msg.index;

        if (msg.state === "hover") {
          this.trigger("mobileHover", [{ index: msg.index }]);
        }

        if (msg.state === "select" && prevState !== "select") {
          this.trigger("mobileSelect", [{ index: msg.index }]);
        }

        break;
      }

      case "throwing": {
        const prevState = this.throwing.state;

        this.throwing.state = msg.state;
        this.throwing.strength = msg.strength;
        this.throwing.angleH = msg.angleH;
        this.throwing.angleV = msg.angleV;

        if (msg.state === "drag" ) {
          this.trigger("throwDrag", [{
            strength: msg.strength,
          }]);
        }

        if (msg.state === "release" && prevState !== "release") {
          this.trigger("throwRelease", [{
            strength: msg.strength,
            angleH: msg.angleH,
            angleV: msg.angleV
          }]);
        }

        break;
      }

      case "show": {
        this.show.state = msg.state;
        if (msg.state === "skip") {
          this.trigger("skipShow");
        }
        break;
      }

      case "outro": {
        this.outro.state = msg.state;
        if (msg.state === "skip") {
          this.trigger("skipOutro");
        }
        break;
      }

      default:
        console.warn("Unknown mobile phase:", msg.phase);
    }
  }
}
