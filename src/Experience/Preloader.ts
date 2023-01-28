export class Preloader {
  public preloaderElementRef: any;
  public pageElementRef!: any;

  constructor() {
    this.preloaderElementRef = document.querySelector('.preloader');
    this.pageElementRef = document.querySelector('.page');
    this.pageElementRef.style.display = 'unset';
  }

  public hide() {
    this.preloaderElementRef.classList.add('preloader--hide');

    setTimeout(() => {
      this.preloaderElementRef.style.display = 'none';
    }, 500);
  }

  public show() {
    this.preloaderElementRef.classList.remove('preloader--show');
  }
}
