const imagenes = [
  'imagen-0', 'imagen-1', 'imagen-2', 'imagen-3'
];

const puzzle = document.getElementById('puzzle');
const piezas = document.getElementById('piezas');
const mensaje = document.getElementById('mensaje');

let terminado = imagenes.length;
let respuestasCorrectas = 0;
let puntuacion = 10; // Puntuación inicial
const puntuacionMinima = 0;
const penalizacion = 2.5;

while (imagenes.length) {
  const index = Math.floor(Math.random() * imagenes.length);

  const div = document.createElement('div');
  div.className = 'pieza';
  div.id = imagenes[index];
  div.draggable = true;
  div.style.backgroundImage = `url("assets/imagenes/${imagenes[index]}.png")`;
  piezas.appendChild(div);
  imagenes.splice(index, 1);
}

for (let i = 0; i < terminado; i++) {
  const div = document.createElement('div');

  div.className = 'placeholder';
  div.dataset.id = i;
  div.style.background = `url("assets/imagenes/numero-${i + 1}.svg") no-repeat center/contain`;
  puzzle.appendChild(div);
}

const audioCorrecto = new Audio('assets/audios/correcto.m4a');
const audioError = new Audio('assets/audios/error.m4a');

piezas.addEventListener('dragstart', e => {
  e.dataTransfer.setData('id', e.target.id);
});

puzzle.addEventListener('dragover', e => {
  e.preventDefault();
  e.target.classList.add('hover');
});

puzzle.addEventListener('dragleave', e => {
  e.target.classList.remove('hover');
});

puzzle.addEventListener('drop', e => {
  e.target.classList.remove('hover');

  const id = e.dataTransfer.getData('id');
  const numero = id.split('-')[1];

  if (e.target.dataset.id === numero) {
    e.target.appendChild(document.getElementById(id));

    terminado--;
    respuestasCorrectas++;

    if (terminado === 0) {
      document.body.classList.add('ganaste');
      audioCorrecto.play();
      mostrarPuntuacion();
    } else {
      audioCorrecto.play();
    }
  } else {
    audioError.play();
    restarPuntuacion();
  }

  // Actualizar el progreso de la barra
  const progreso = (respuestasCorrectas / 4) * 100;
  const barraProgreso = document.querySelector('.progreso');
  barraProgreso.style.width = progreso + '%';
});

function restarPuntuacion() {
  puntuacion -= penalizacion;
  if (puntuacion < puntuacionMinima) {
    puntuacion = puntuacionMinima;
  }
}

function mostrarPuntuacion() {
  const puntuacionFinal = document.getElementById('puntuacion');
  puntuacionFinal.textContent = `Tu Calificación es: ${puntuacion.toFixed(1)}`;
}

document.getElementById("restartButton").addEventListener("click", function() {
  document.getElementById("myModal").style.display = "block";
});

document.getElementById("yesButton").addEventListener("click", function() {
  location.reload();
});

document.getElementById("noButton").addEventListener("click", function() {
  document.getElementById("myModal").style.display = "none";
});
