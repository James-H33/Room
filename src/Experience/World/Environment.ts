import * as THREE from "three";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";

export class Environment {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public sunLight!: THREE.DirectionalLight;
  public ambientLight!: THREE.AmbientLight;
  public mouse: any;
  public raycaster!: THREE.Raycaster;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
    // this.setGrid();
    // this.setAxisHelper();
    // this.setRaycaster();
    this.onMouseMove();
  }
  public onMouseMove() {
    this.mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event: any) => {
      const x = event.clientX / window.innerWidth * 2 - 1
      const y = -1 * (event.clientY / window.innerHeight * 2 - 1)
      this.mouse.x = x;
      this.mouse.y = y;
    });
  }

  public setRaycaster() {
    this.raycaster = new THREE.Raycaster();
  }

  public setSunlight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.shadow.mapSize.width = 512 * 2;
    this.sunLight.shadow.mapSize.height = 512 * 2
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 500;
    this.sunLight.shadow.camera.left = -10;
    this.sunLight.shadow.camera.right = 10;
    this.sunLight.shadow.camera.top = 10;
    this.sunLight.shadow.camera.bottom = -10;
    this.sunLight.position.set(-2, 7, 5);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

    // const sunlightHelper = new THREE.CameraHelper(this.sunLight.shadow.camera);

    // this.scene.add(sunlightHelper);
    this.scene.add(this.ambientLight);
    this.scene.add(this.sunLight);
  }

  public setGrid() {
    const size = 20;
    const divisions = 20;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
  }

  public update() {

  }

  public setAxisHelper() {
    const axisHelper = new THREE.AxesHelper(8);
    this.scene.add(axisHelper);
  }
}
