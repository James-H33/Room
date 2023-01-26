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
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(0, 0, -5),
      new THREE.Vector3(5, 0, 0),
      new THREE.Vector3(5, 0, 5),
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
    let lookAtPosition = new THREE.Vector3(0, 0, 0);

    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
    this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
    this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);

    this.curve.getPointAt(this.lerp.current, nextVector);
    this.curve.getPointAt(GSAP.utils.clamp(0, 1, this.lerp.current + 0.001), lookAtPosition);
    this.camera.orthoCamera.position.copy(nextVector);
    this.camera.orthoCamera.lookAt(lookAtPosition);
  }
}
