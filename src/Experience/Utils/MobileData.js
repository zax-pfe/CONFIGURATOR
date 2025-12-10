// stocke et met à jour les données reçues depuis le mobile
export default class MobileData {
  constructor() {
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
  }

  processMobileMessage(msg) {
    if (!msg.device || msg.device !== "mobile") return;

    switch (msg.phase) {
      case "selection":
        this.selection.state = msg.state;
        this.selection.index = msg.index;
        break;

      case "throwing":
        this.throwing.state = msg.state;
        this.throwing.strength = msg.strength;
        this.throwing.angleH = msg.angleH;
        this.throwing.angleV = msg.angleV;
        break;

      default:
        console.warn("Unknown mobile phase:", msg.phase);
    }
  }
}
