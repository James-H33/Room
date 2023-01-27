import * as THREE from "three";
import GSAP from "gsap";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";

export class Room {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public room: any;
  public roomScene: any;
  lerp: { current: number; target: number; ease: number; };

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.Room;
    this.roomScene = this.room.file.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1
    }

    this.setModel();
    this.onMouseMove();
  }

  public onMouseMove() {
    window.addEventListener('mousemove', (event: any) => {
      const x = ((event.clientX - window.innerWidth / 2) / window.innerWidth) * 2

      this.lerp.target = x * 0.1;
    });
  }

  public setModel() {
    this.roomScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }

      if (child.isMesh && child.name === 'Screen_View') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.Screen.file
        })
      }
    });

    this.scene.add(this.roomScene);
  }

  public update() {
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
    this.roomScene.rotation.y = this.lerp.current + (-Math.PI * 0.25)
  }
}
