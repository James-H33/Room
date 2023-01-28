import { Experience } from './Experience/Experience';
import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector<HTMLDivElement>('.experience-canvas');
  new Experience(canvas);
});
