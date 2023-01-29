import GSAP from "gsap";
import * as THREE from "three";
import { Camera } from "../Camera";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from '@ashthornton/asscroll'
import { Environment } from "./Environment";

export class Controls {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public camera: Camera;
  public time: any;
  public sizes: any;
  public curve!: THREE.CatmullRomCurve3;
  public room!: any;
  public floor!: any;
  public environment!: Environment;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.environment = this.experience.world.environment;
    this.floor = this.experience.world.floor;
    this.room = this.experience.world.room.roomScene
    GSAP.registerPlugin(ScrollTrigger)

    this.setupASScroll();
    this.setScrollTrigger();
  }

  public setScrollTrigger() {
    const mediaMatcher = GSAP.matchMedia();

    mediaMatcher.add("(min-width: 969px)", () => {
      this.desktopTriggers();

      return () => { };
    });

    mediaMatcher.add("(max-width: 969px)", () => {
      this.mobileTriggers();

      return () => { };
    });
  }

  public desktopTriggers() {
    // First Section
    const firstTimeline = GSAP.timeline({
      scrollTrigger: {
        ...this.triggerConfig(".first-move"),
      }
    });

    const circle1 = this.floor.transitionalFloors[0];
    circle1.visible = true;
    this.scene.add(circle1);

    const firstMoveXPos = () => this.sizes.aspectRatio * 2.25;

    firstTimeline.to(
      circle1.position,
      {
        x: () => firstMoveXPos()
      },
      'id-1'
    );

    firstTimeline.to(
      circle1.scale,
      {
        x: () => 3.5,
        y: () => 3.5,
        z: () => 3.5,
      },
      'id-1'
    );

    firstTimeline.to(
      this.room.position,
      {
        x: () => firstMoveXPos()
      },
      'id-1'
    );

    // Second Section
    const secondTimeline = GSAP.timeline({
      scrollTrigger: {
        ...this.triggerConfig(".second-move"),
      }
    });

    const circle2 = this.floor.transitionalFloors[1];
    this.scene.add(circle2);

    const timeLine = GSAP.timeline({
      scrollTrigger: {
        ...this.triggerConfig(".second-move"),
      },
      onStart: () => {
        circle2.position.x = this.room.position.x;
        circle2.visible = true;
      },
      onReverseComplete: () => {
        circle2.visible = false;
      }
    });

      timeLine.to({}, {});

      secondTimeline.to(
        circle2.scale,
        {
          x: () => 3.5,
          y: () => 3.5,
          z: () => 3.5,
        },
        'id-2'
      )

      secondTimeline.to(
        this.room.position,
        {
          x: () => -(this.sizes.aspectRatio * 0.5),
        },
        'id-2'
      );

      secondTimeline.to(
        this.room.scale,
        {
          x: () => 2,
          y: () => 2,
          z: () => 2,
        },
        'id-2'
      );

    const circle3 = this.floor.transitionalFloors[2];
    this.scene.add(circle3);

    // Third Section
    const thirdTimeline = GSAP.timeline({
      scrollTrigger: {
        ...this.triggerConfig(".third-move"),
      },
      onStart: () => {
        circle3.visible = true;
        this.resources.items['Screen'].elementRef.play();
      },
      onReverseComplete: () => {
        circle3.visible = false;
        this.resources.items['Screen'].elementRef.pause();
      }
    });

    thirdTimeline.to(
      circle3.position,
      {
        x: () => this.sizes.aspectRatio * 3,
      },
      'id-3'
    );

    thirdTimeline.to(
      circle3.scale,
      {
        x: () => 3.5,
        y: () => 3.5,
        z: () => 3.5,
      },
      'id-3'
    )

    thirdTimeline.to(
      this.room.position,
      {
        x: () => this.sizes.aspectRatio * 3,
      },
      'id-3'
    );
  }

  public mobileTriggers() {
    // First Section
    const firstTimeline = GSAP.timeline({
      scrollTrigger: {
        ...this.triggerConfig(".first-move")
      }
    });

    firstTimeline.to(
      this.room.scale,
      {
        x: () => 1.5,
        y: () => 1.5,
        z: () => 1.5,
      },
      'id-1'
    );

    // Second Section
    const secondTimeline = GSAP.timeline({
      scrollTrigger: {
        ...this.triggerConfig(".second-move"),
        scrub: 0.6
      }
    });

    secondTimeline.to(
      this.room.position,
      {
        x: () => -(this.sizes.aspectRatio * 3)
      },
      'id-2'
    );

    // Third Section
    const thirdTimeline = GSAP.timeline({
      scrollTrigger: {
        ...this.triggerConfig(".third-move"),
        scrub: 0.8,
      },
      onStart: () => {
        this.resources.items['Screen'].elementRef.play();
      },
      onReverseComplete: () => {
        this.resources.items['Screen'].elementRef.pause();
      }
    });

    thirdTimeline.to(
      this.room.position,
      {
        x: () => this.sizes.width * 0.006,
      },
      'id-3'
    );

    thirdTimeline.to(
      this.room.scale,
      {
        x: () => 2.5,
        y: () => 2.5,
        z: () => 2.5,
      },
      'id-3'
    );
  }

  public setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.6,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          (asscroll as any).currentPos = value;
          return;
        }

        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);

    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    asscroll.enable({
      newScrollElements: document.querySelectorAll("[asscroll]")
    });

    return asscroll;
  }

  public update() { }

  private triggerConfig(name: string) {
    return {
      trigger: name,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true
    }
  }
}
