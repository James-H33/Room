import * as THREE from "three";
import { Experience } from "./Experience";
import { Sizes } from "./Utils/Sizes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Camera {
  public experience: Experience;
  public sizes: Sizes;
  public scene: THREE.Scene;
  public canvas: any;
  public perspectiveCamera!: THREE.PerspectiveCamera;
  public orthoCamera!: THREE.OrthographicCamera;
  public frustrum!: number;
  public controls!: OrbitControls;
  public orthoHelper!: THREE.CameraHelper;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.createOrbitalControls();
  }

  public createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspectRatio, 0.1, 100);
    this.perspectiveCamera.position.x = 6;
    this.perspectiveCamera.position.y = 12;
    this.perspectiveCamera.position.z = 29;
    this.scene.add(this.perspectiveCamera);
  }

  public createOrthographicCamera() {
    const frustrum = this.sizes.frustrum = 5
    this.orthoCamera = new THREE.OrthographicCamera();
    this.orthoCamera.position.z = 5;

    this.orthoCamera.left = -((this.sizes.aspectRatio * frustrum) / 2)
    this.orthoCamera.right = (this.sizes.aspectRatio / frustrum) / 2
    this.orthoCamera.top = frustrum / 2
    this.orthoCamera.bottom = -(frustrum / 2)
    this.orthoCamera.near = -20
    this.orthoCamera.far = 20;

    this.orthoHelper = new THREE.CameraHelper(this.orthoCamera);
    this.scene.add(this.orthoHelper);
    this.scene.add(this.orthoCamera);
  }

  public createOrbitalControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }

  public resize() {
    this.perspectiveCamera.aspect = this.sizes.aspectRatio;
    this.perspectiveCamera.updateProjectionMatrix();

    const frustrum = this.sizes.frustrum;
    this.orthoCamera.left = -((this.sizes.aspectRatio * frustrum) / 2)
    this.orthoCamera.right = (this.sizes.aspectRatio / frustrum) / 2
    this.orthoCamera.top = frustrum / 2
    this.orthoCamera.bottom = -(frustrum / 2)
    this.orthoCamera.updateProjectionMatrix();
  }

  public update() {
    this.controls.update();
    this.orthoHelper.matrixWorldNeedsUpdate = true;
    this.orthoHelper.update();
    this.orthoHelper.position.copy(this.orthoCamera.position);
    this.orthoHelper.rotation.copy(this.orthoCamera.rotation);
  }
}
