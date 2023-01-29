export class Preloader {
  public preloaderElementRef: any;
  public pageElementRef!: any;

  constructor() {
    this.preloaderElementRef = document.querySelector('.preloader');
    this.pageElementRef = document.querySelector('.page');
    this.pageElementRef.style.display = 'unset';
  }

  public hide() {
    this.preloaderElementRef.classList.add('--hide');

    setTimeout(() => {
      this.preloaderElementRef.style.display = 'none';
    }, 1000);
  }

  public show() {
    this.preloaderElementRef.classList.remove('preloader--show');
  }
}
