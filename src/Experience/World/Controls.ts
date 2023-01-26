import GSAP from "gsap";
import * as THREE from "three";
import { Camera } from "../Camera";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";

export class Controls {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public camera: Camera;
  public time: any;
  public curve!: THREE.CatmullRomCurve3;
  public progress = 0;
  lerp!: any;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.time = this.experience.time;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    this.setPath();
    this.onWheel();
  }

  public setPath() {
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 2, 0),
      new THREE.Vector3(0, 2, -5),
      new THREE.Vector3(5, 2, 0),
      new THREE.Vector3(5, 2, 5),
    ], true);

    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  public onWheel() {
    window.addEventListener('wheel', (e: any) => {
      if (e.deltaY > 0) {
        this.lerp.target += 0.01;
      } else {
        this.lerp.target -= 0.01;
      }
    })
  }

  public update() {
    const nextVector = new THREE.Vector3(0, 0, 0);
    const lookAheadVector = new THREE.Vector3(0, 0, 0);
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
    this.curve.getPointAt(this.lerp.current % 1, nextVector);
    this.curve.getPointAt((this.lerp.current + 0.0001) % 1, lookAheadVector);
    this.camera.orthoCamera.position.copy(nextVector);

    const directionalVector = new THREE.Vector3(0, 0, 0);

    directionalVector.subVectors(lookAheadVector, nextVector);

    directionalVector.normalize();

    const crossVector = new THREE.Vector3(0, 0, 0);
    crossVector.crossVectors(directionalVector, new THREE.Vector3(0, 1, 0));
    crossVector.multiplyScalar(100);
    this.camera.orthoCamera.lookAt(0, 1, 0);
  }
}
