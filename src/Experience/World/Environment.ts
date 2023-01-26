import * as THREE from "three";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";

export class Environment {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public sunLight!: THREE.DirectionalLight;
  public ambientLight!: THREE.AmbientLight;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
    this.setGrid();
    this.setAxisHelper();
  }

  public setSunlight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
    this.sunLight.position.set(0, 50, 0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.position.set(4, 7, 3);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);

    const sunlightHelper = new THREE.CameraHelper(this.sunLight.shadow.camera);

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

  public setAxisHelper() {
    const axisHelper = new THREE.AxesHelper(5);
    this.scene.add(axisHelper);
  }
}
