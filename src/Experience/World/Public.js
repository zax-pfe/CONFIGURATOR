export default class Public {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.publicZoneMaxRadius = 20;
    this.publicZoneMinRadius = 10;
    this.maxAngle = (5 / 8) * Math.PI;
    this.minAngle = (7 / 8) * Math.PI;
    this.dimmensions = { width: 1, height: 2, depth: 0.5 };

    // definir la zone dans laquel le public va etre placé

    // creer un mesh de public
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(
      this.dimmensions.width,
      this.dimmensions.height,
      this.dimmensions.depth
    );
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "#0fed1eff",
      wireframe: false,
    });
  }

  createMesh(position, rotation) {
    // creer un mesh de public a la position et rotation donnée
  }

  createPublicZone() {
    // definir la zone dans laquel le public va etre placé
  }
  createDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Public");
    }
  }
}
