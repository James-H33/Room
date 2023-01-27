import { Experience } from './Experience/Experience';
import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector<HTMLDivElement>('.experience-canvas');
  const experience = new Experience(canvas);
});
