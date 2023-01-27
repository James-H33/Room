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
    this.orthoCamera = new THREE.OrthographicCamera();

    this.updateOrthoCamera();
    this.orthoCamera.position.set(0, 3, 5);
    // this.orthoCamera.rotation.set(-0.65, 0, 0);
    this.orthoCamera.lookAt(0, 1, 0);

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
    this.updateOrthoCamera();
  }

  public update() {
    this.controls.update();
    // this.updateOrthoCamera();
    // this.orthoHelper.matrixWorldNeedsUpdate = true;
    // this.orthoHelper.update();
    // this.orthoHelper.position.copy(this.orthoCamera.position);
    // this.orthoHelper.rotation.copy(this.orthoCamera.rotation);
  }

  private updateOrthoCamera() {
    this.orthoCamera.left = (-this.sizes.aspectRatio * this.sizes.frustrum) / 2;
    this.orthoCamera.right =(this.sizes.aspectRatio * this.sizes.frustrum) / 2;
    this.orthoCamera.top = this.sizes.frustrum / 2;
    this.orthoCamera.bottom = -this.sizes.frustrum / 2;
    this.orthoCamera.near = -20
    this.orthoCamera.far = 20;
    this.orthoCamera.updateProjectionMatrix();
  }

  // private addOrthoHelper() {
  //   this.orthoHelper = new THREE.CameraHelper(this.orthoCamera);
  //   this.scene.add(this.orthoHelper);
  // }
}
