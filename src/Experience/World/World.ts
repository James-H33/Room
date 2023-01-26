import { Camera } from "../Camera";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";
import { Sizes } from "../Utils/Sizes";
import { Controls } from "./Controls";
import { Environment } from "./Environment";
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

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.resourcesLoaded$
      .subscribe(() => {
        console.log('Loaded!');
        this.environment = new Environment();
        this.room = new Room();
        this.controls = new Controls();
      });
  }

  public update() {
    if (!this.room || !this.controls) {
      return;
    }

    this.controls.update();
    this.room.update();
  }
}
