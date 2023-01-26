import { Subject } from "rxjs";

export class Time {
  public start = Date.now();
  public current = Date.now();
  public elapsed = 0;
  public delta = 0;
  public update$: Subject<any> = new Subject();

  constructor() {
    this.start = Date.now();
    this.current = Date.now();

    this.update();
  }

  public update() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.elapsed = currentTime - this.start;
    this.current = currentTime;
    this.update$.next(null);
    window.requestAnimationFrame(() => this.update());
  }
}
