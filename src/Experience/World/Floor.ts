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
  public circleGeometry!: THREE.CircleGeometry;
  public transitionalFloors: THREE.Mesh[] = [];

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.Room;
    this.roomScene = this.room.file.scene;

    this.setMainFloor();
    this.setTransitionFloors();
  }

  public setMainFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.receiveShadow = true;
    this.plane.position.y = 0;
    this.plane.rotation.x = -Math.PI * 0.5
    this.scene.add(this.plane);
  }

  public setTransitionFloors() {
    const transitionalFloors = [];
    this.circleGeometry = new THREE.CircleGeometry(5, 32);

    transitionalFloors.push(this.makeCircle('#91a197', this.plane.position.y + 0.001))
    transitionalFloors.push(this.makeCircle('#6d6875', this.plane.position.y + 0.002))
    transitionalFloors.push(this.makeCircle('#91a197', this.plane.position.y + 0.003))

    this.transitionalFloors = transitionalFloors as any;
  }

  private makeCircle(color: string, posY: number) {
    const circle = new THREE.Mesh(
      this.circleGeometry,
      new THREE.MeshStandardMaterial({ color })
    );

    circle.receiveShadow = true;
    circle.position.y = posY;
    circle.rotation.x = -Math.PI * 0.5
    circle.scale.x = 0.1;
    circle.scale.y = 0.1;
    circle.scale.z = 0.1;
    circle.visible = false;

    return circle;
  }

  public resize() {

  }

  public update() {
  }
}
