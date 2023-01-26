import { Subject } from "rxjs";

export class Sizes {
  public width: number;
  public height: number;
  public aspectRatio: number;
  public pixelRatio: number;
  public frustrum: number;
  public resize$: Subject<any> = new Subject();

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRatio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 3

    window.addEventListener("resize", this.onResize.bind(this));
  }

  public onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRatio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.resize$.next(null);
  }
}
