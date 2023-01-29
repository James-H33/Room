import { Camera } from "../Camera";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";
import { Sizes } from "../Utils/Sizes";
import { Controls } from "./Controls";
import { Environment } from "./Environment";
import { Floor } from "./Floor";
import { Room } from "./Room";

export class World {
  public experience: Experience;
  public sizes: Sizes;
  public scene: THREE.Scene;
  public canvas: any;
  public camera: Camera;
  public room!: Room;
  public resources!: Resources;
  public environment!: Environment;
  public controls!: Controls;
  public floor!: Floor;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.resourcesLoaded$
      .subscribe(() => {
        this.environment = new Environment();
        this.room = new Room();
        this.floor = new Floor();
        this.controls = new Controls();
      });
  }

  public update() {
    if (!this.room || !this.controls || !this.environment) {
      return;
    }

    // this.environment.update();
    // this.controls.update();
    this.room.update();
  }
}
