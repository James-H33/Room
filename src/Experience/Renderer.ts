import * as THREE from "three";
import { Camera } from "./Camera";
import { Experience } from "./Experience";
import { Sizes } from "./Utils/Sizes";

export class Renderer {
  public experience: Experience;
  public sizes: Sizes;
  public scene: THREE.Scene;
  public canvas: any;
  public camera: Camera;
  public renderer!: THREE.WebGLRenderer;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  public setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });

    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  public resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  public update() {
    // First Viewport Size
    this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
    this.renderer.render(this.scene, this.camera.orthoCamera);

    // Second Viewport Size
    this.renderer.setScissorTest(true);
    this.renderer.setViewport(this.sizes.width * 0.65, this.sizes.height * 0.65, this.sizes.width * 0.35, this.sizes.height * 0.35);
    this.renderer.setScissor(this.sizes.width * 0.65, this.sizes.height * 0.65, this.sizes.width * 0.35, this.sizes.height * 0.35);
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
    this.renderer.setScissorTest(false);
  }
}
