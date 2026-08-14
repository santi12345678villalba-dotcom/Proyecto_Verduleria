import { initClima } from './Clima.js';
import { initEstadisticas } from './Estadisticas.js';
import { initNavBar } from './NavBar.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavBar();
    initClima();
    initEstadisticas();
});
