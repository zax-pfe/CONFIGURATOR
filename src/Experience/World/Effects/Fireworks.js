import Experience from "../../Experience.js";
import * as THREE from "three";
import fireworkVertexShader from "../../../shaders/fireworks/vertex.glsl";
import fireworkFragmentShader from "../../../shaders/fireworks/fragment.glsl";

console.log("Fireworks module loaded:", fireworkFragmentShader);

export default class Fireworks {
  constructor() {
    // setupt the experience
    this.experience = new Experience();
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("fireworks");
    }

    console.log("Fireworks initialized");

    this.createFirework(100, new THREE.Vector3(0, 0, 0));
  }

  createFirework(count, position) {
    const positionArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positionArray[i3 + 0] = Math.random() - 0.5;
      positionArray[i3 + 1] = Math.random() - 0.5;
      positionArray[i3 + 2] = Math.random() - 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionArray, 3)
    );

    const material = new THREE.ShaderMaterial({
      vertexShader: fireworkVertexShader,
      fragmentShader: fireworkFragmentShader,
    });

    const fireworks = new THREE.Points(geometry, material);
    fireworks.position.copy(position);
    this.experience.scene.add(fireworks);
  }
}
