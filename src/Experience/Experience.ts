import { take } from "rxjs";
import * as THREE from "three";
import { Camera } from "./Camera";
import { Preloader } from "./Preloader";
import { Renderer } from "./Renderer";
import { assets } from "./Utils/assets";
import { Resources } from "./Utils/Resources";
import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";
import { World } from "./World/World";

export class Experience {
  public static instance: Experience;
  public canvas: any;
  public scene!: THREE.Scene;
  public camera!: Camera;
  public renderer!: Renderer;
  public sizes!: Sizes;
  public time!: Time;
  public world!: World;
  public resources!: Resources;
  public preloader!: Preloader;

  constructor(canvas?: any) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;

    this.preloader = new Preloader();
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.time = new Time();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();

    this.resources.resourcesLoaded$
      .pipe(take(1))
      .subscribe(() => {
        this.preloader.hide();
      });

    this.time.update$
      .subscribe(() => {
        this.world.update();
        this.camera.update();
        this.renderer.update();
      });

    this.sizes.resize$
      .subscribe(() => {
        this.camera.resize();
        this.renderer.resize();
      });
  }
}
