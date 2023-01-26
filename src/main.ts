import { Experience } from './Experience/Experience';
import './style.scss'

const canvas = document.querySelector<HTMLDivElement>('.experience-canvas');
const experience = new Experience(canvas);