import * as THREE from "three";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";

export class Floor {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public room: any;
  public roomScene: any;
  public geometry!: THREE.PlaneGeometry;
  public material!: THREE.MeshStandardMaterial;
  public plane!: THREE.Mesh<any, any>;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.Room;
    this.roomScene = this.room.file.scene;

    this.setMainFloor();
  }

  public setMainFloor() {
    this.geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.receiveShadow = true;
    this.plane.position.y = -0.3;
    this.plane.rotation.x = -Math.PI * 0.5
    this.scene.add(this.plane);
  }

  public resize() {

  }

  public update() {
  }
}
