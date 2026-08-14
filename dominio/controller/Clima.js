const climaPorCodigo = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla con escarcha',
    51: 'Llovizna ligera',
    53: 'Llovizna',
    55: 'Llovizna intensa',
    56: 'Llovizna helada',
    57: 'Llovizna helada intensa',
    61: 'Lluvia ligera',
    63: 'Lluvia',
    65: 'Lluvia intensa',
    66: 'Lluvia helada',
    67: 'Lluvia helada intensa',
    71: 'Nieve ligera',
    73: 'Nieve',
    75: 'Nieve intensa',
    77: 'Granizo',
    80: 'Chubascos',
    81: 'Chubascos fuertes',
    82: 'Chubascos intensos',
    85: 'Nevadas',
    86: 'Nevadas intensas',
    95: 'Tormenta',
    96: 'Tormenta con granizo',
    99: 'Tormenta fuerte'
};

const iconosPorCodigo = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    56: '🌧️',
    57: '🌧️',
    61: '🌦️',
    63: '🌧️',
    65: '🌧️',
    66: '🌧️',
    67: '🌧️',
    71: '🌨️',
    73: '❄️',
    75: '❄️',
    77: '🌨️',
    80: '🌦️',
    81: '🌧️',
    82: '🌧️',
    85: '🌨️',
    86: '🌨️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️'
};

export async function initClima() {
    const clima = document.querySelector('.clima');
    if (!clima) return;

    const valor = clima.querySelector('strong');
    const icono = clima.querySelector('.icono');
    const datosClima = clima.querySelector('.clima-datos');

    if (!valor || !icono || !datosClima) return;

    try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=-34.4626&longitude=-57.8398&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code&timezone=America/Montevideo';
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error('No se pudo obtener el clima');
        }

        const datos = await respuesta.json();
        const temperatura = Math.round(datos.current.temperature_2m);
        const sensacion = Math.round(datos.current.apparent_temperature);
        const humedad = Math.round(datos.current.relative_humidity_2m);
        const codigo = datos.current.weather_code;
        const descripcion = climaPorCodigo[codigo] || 'Clima actual';

        valor.textContent = `${temperatura}°C`;
        icono.textContent = iconosPorCodigo[codigo] || '🌤️';
        icono.title = descripcion;
        datosClima.innerHTML = `
            <span>Sensación: ${sensacion}°C</span>
            <span>Humedad: ${humedad}%</span>
        `;
    } catch (error) {
        valor.textContent = '--°C';
        icono.textContent = '🌤️';
        icono.title = 'Sin datos';
        datosClima.innerHTML = '<span>Sensación: --°C</span><span>Humedad: --%</span>';
    }
}

