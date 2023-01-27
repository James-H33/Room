import GSAP from "gsap";
import * as THREE from "three";
import { Camera } from "../Camera";
import { Experience } from "../Experience";
import { Resources } from "../Utils/Resources";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from '@ashthornton/asscroll'

export class Controls {
  public experience: Experience;
  public scene: THREE.Scene;
  public resources: Resources;
  public camera: Camera;
  public time: any;
  public sizes: any;
  public curve!: THREE.CatmullRomCurve3;
  public firstMoveTimeline!: gsap.core.Timeline;
  public secondMoveTimeline!: gsap.core.Timeline;
  public room!: any;
  public thirdMoveTimeline!: gsap.core.Timeline;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.room = this.experience.world.room.roomScene
    GSAP.registerPlugin(ScrollTrigger)

    this.setupASScroll();
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
          ...triggerConfig(".first-move"),
        }
      });

      const circleGeometry = new THREE.CircleGeometry(5, 32);
      const circleMaterial = new THREE.MeshStandardMaterial({
        color: '#557ea2'
      });

      const circle1 = new THREE.Mesh(circleGeometry, circleMaterial);
      circle1.receiveShadow = true;
      circle1.position.y = -0.2;
      circle1.rotation.x = -Math.PI * 0.5
      circle1.scale.x = 0.1;
      circle1.scale.y = 0.1;
      circle1.scale.z = 0.1;
      this.scene.add(circle1);


      this.firstMoveTimeline.to(
        circle1.position,
        {
          x: () => this.sizes.width * 0.0014
        },
        'id-1'
      );


      this.firstMoveTimeline.to(
        circle1.scale,
        {
          x: () => 3.2,
          y: () => 3.2,
          z: () => 3.2,
        },
        'id-1'
      )

      this.firstMoveTimeline.to(
        this.room.position,
        {
          x: () => this.sizes.width * 0.0014
        },
        'id-1'
      );


      // Second Section
      this.secondMoveTimeline = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".second-move"),
        }
      });

      const circleMaterial2 = new THREE.MeshStandardMaterial({
        color: 0xffffff
      });
      const circle2 = new THREE.Mesh(circleGeometry, circleMaterial2);
      circle2.receiveShadow = true;
      circle2.position.y = -0.18;
      circle2.position.x = this.sizes.width * 0.0014;
      circle2.rotation.x = -Math.PI * 0.5;
      circle2.scale.x = 0.1;
      circle2.scale.y = 0.1;
      circle2.scale.z = 0.1;
      circle2.visible = false;
      this.scene.add(circle2);

      const timeLine = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".second-move"),
        },
        onStart: () => {
          circle2.visible = true;
        },
        onReverseComplete: () => {
          circle2.visible = false;
        }
      });

      timeLine.to({}, {});

      this.secondMoveTimeline.to(
        circle2.position,
        {
          x: () => 0,
          z: () => 0
        },
        'id-2'
      );


      this.secondMoveTimeline.to(
        circle2.scale,
        {
          x: () => 3.2,
          y: () => 3.2,
          z: () => 3.2,
        },
        'id-2'
      )

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
      this.thirdMoveTimeline = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".third-move"),
        },
        onStart: () => {
          console.log('Start');
          this.resources.items['Screen'].elementRef.play();
        },
        onComplete: () => {
          console.log('Complete');
        },
        onReverseComplete: () => {
          this.resources.items['Screen'].elementRef.pause();
        }
      });

      this.thirdMoveTimeline.to(
        this.room.position,
        {
          x: () => this.sizes.width * 0.0025,
        },
        'id-3'
      );

      return () => { };
    });

    mm.add("(max-width: 969px)", () => {
      console.log('Mobile');

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
        this.room.scale,
        {
          x: () => 1.5,
          y: () => 1.5,
          z: () => 1.5,
        },
        'id-1'
      );

      // Second Section
      this.secondMoveTimeline = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".second-move"),
          scrub: 0.6
        }
      });

      this.secondMoveTimeline.to(
        this.room.position,
        {
          x: () => this.sizes.width * 0.0025,
        },
        'id-2'
      );

      // Third Section
      this.thirdMoveTimeline = GSAP.timeline({
        scrollTrigger: {
          ...triggerConfig(".third-move"),
          scrub: 0.8,
        },
        onStart: () => {
          console.log('Start');
          this.resources.items['Screen'].elementRef.play();
        },
        onComplete: () => {
          console.log('Complete');
        },
        onReverseComplete: () => {
          this.resources.items['Screen'].elementRef.pause();
        }
      });

      this.thirdMoveTimeline.to(
        this.room.position,
        {
          x: () => this.sizes.width * 0.006,
        },
        'id-3'
      );

      this.thirdMoveTimeline.to(
        this.room.scale,
        {
          x: () => 2.5,
          y: () => 2.5,
          z: () => 2.5,
        },
        'id-3'
      );

      return () => { };
    });
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

    requestAnimationFrame(() => {
        asscroll.enable({
            newScrollElements: document.querySelectorAll(
                ".gsap-marker-start, .gsap-marker-end, [asscroll]"
            ),
        });
    });
    return asscroll;
}

  public update() {
    // this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
  }
}
