import GSAP from "gsap";
import * as THREE from "three";
import { Camera } from "../Camera";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export class Controls {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public camera: Camera;
  public time: any;
  public sizes: any;
  public curve!: THREE.CatmullRomCurve3;
  public lerp!: any;
  public firstMoveTimeline!: gsap.core.Timeline;
  public secondMoveTimeline!: gsap.core.Timeline;
  public room!: any;
  public thridMoveTimeline!: gsap.core.Timeline;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.room = this.experience.world.room.roomScene
    GSAP.registerPlugin(ScrollTrigger)

    // this.lerp = {
    //   current: 0,
    //   target: 0,
    //   ease: 0.1
    // }
    this.setScrollTrigger();
  }

  public setScrollTrigger() {
    // create
    let mm = GSAP.matchMedia();

    // add a media query. When it matches, the associated function will run
    mm.add("(min-width: 969px)", () => {
      console.log('Desktop');

      function triggerConfig(name: string) {
        return {
          trigger: name,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      }

      // First Section
      this.firstMoveTimeline = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".first-move")
        }
      });

      this.firstMoveTimeline.to(
        this.room.position,
        {
          x: () => this.sizes.width * 0.0014
        },
      );

      // Second Section
      this.secondMoveTimeline = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".second-move")
        }
      });

      this.secondMoveTimeline.to(
        this.room.position,
        {
          x: () => 0,
          z: () => 0
        },
        'id-2'
      );

      this.secondMoveTimeline.to(
        this.room.scale,
        {
          x: () => 2,
          y: () => 2,
          z: () => 2,
        },
        'id-2'
      );



      // Third Section
      this.thridMoveTimeline = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".thrid-move")
        }
      });

      this.thridMoveTimeline.to(
        this.room.position,
        {
          x: () => 0,
          z: () => 0
        },
        'id-3'
      );

      this.thridMoveTimeline.to(
        this.room.scale,
        {
          x: () => 0,
          y: () => 0,
          z: () => 0,
        },
        'id-3'
      );


      return () => { // optional
        // custom cleanup code here (runs when it STOPS matching)
      };
    });

    mm.add("(max-width: 969px)", () => {
      console.log('Mobile');

      return () => { // optional
        // custom cleanup code here (runs when it STOPS matching)
      };
    });

    // later, if we need to revert all the animations/ScrollTriggers...
    // mm.revert();
  }

  public update() {
    // this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
  }
}
