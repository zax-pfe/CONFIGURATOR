import * as dat from "dat.gui";
import GUI from "lil-gui";

export default class Debug {
  constructor() {
    // console.log("Debug initialized");
    this.active = window.location.hash === "#debug";

    if (this.active) {
      // this.ui = new dat.GUI();
      this.ui = new GUI();
    }
  }
}
