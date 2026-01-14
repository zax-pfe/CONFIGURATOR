import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { DotScreenPass } from "three/addons/postprocessing/DotScreenPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

export default class Renderer {
  constructor() {
    // console.log("Renderer initialized");
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
    // this.setUpCSSRenderer();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    // this.instance.toneMappingExposure = 2.5;

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    this.composer = new EffectComposer(this.instance);
    this.composer.setSize(this.sizes.width, this.sizes.height);

    const renderPass = new RenderPass(this.scene, this.camera.instance);
    this.composer.addPass(renderPass);

    // Ajoute un flou a l'ecran
    // const bokehPass = new BokehPass(this.scene, this.camera.instance, {
    //   focus: 1000,
    //   aperture: 50,
    //   maxblur: 0.002,
    // });

    // this.composer.addPass(bokehPass);

    // Ajoute un effet de bloom
    const unrealBloomPass = new UnrealBloomPass();
    unrealBloomPass.strength = 0.3;
    unrealBloomPass.radius = 1;
    unrealBloomPass.threshold = 0.6;
    this.composer.addPass(unrealBloomPass);

    // Ajoute un effet de pointillé
    // const pass = new DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);
    // this.composer.addPass(pass);

    // Fais ressortir les elements de l'image
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms["resolution"].value.set(
      1 / this.sizes.width,
      1 / this.sizes.height
    );
    this.composer.addPass(fxaaPass);

    // Ajoute un effet de grain
    // const filmPass = new FilmPass(1, 0.5, 2048, false);
    // this.composer.addPass(filmPass);

    // Ajoute un effet de sortie
    // const outputPass = new OutputPass();
    // this.composer.addPass(outputPass);
  }

  setUpCSSRenderer() {
    // Ajoute le renderer pour pouvoir afficher du HTML en 3D
    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.setSize(this.sizes.width, this.sizes.height);
    this.cssRenderer.domElement.style.position = "absolute";
    this.cssRenderer.domElement.style.top = "0";
    this.cssRenderer.domElement.style.left = "0";
    this.cssRenderer.domElement.style.pointerEvents = "none";
    this.cssRenderer.domElement.style.zIndex = "10";
    document.body.appendChild(this.cssRenderer.domElement);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    // this.cssRenderer.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    // this.instance.render(this.scene, this.camera.instance);
    this.composer.render();
    // this.cssRenderer.render(this.scene, this.camera.instance);
  }
}
