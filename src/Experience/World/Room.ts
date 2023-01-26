import * as THREE from "three";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";

export class Room {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public room: any;
  public roomScene: any;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.Room;
    this.roomScene = this.room.file.scene;
    this.setModel();
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

  }
}
