import Stats from "stats.js";

export default class StatsUtils {
  constructor() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }
}
