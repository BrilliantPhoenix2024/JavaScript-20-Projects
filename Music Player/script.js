const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Check if Playing
let isPlaing = false;

// Play
function playSong() {
  isPlaing = true;
  playBtn.classList.replace("fa-play", "fa - pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaing = false;
  playBtn.classList.replace("fa-pause", "fa - play");
  playBtn.setAttribute("title", "Play");

  music.pause();
}

// Play or Pause Evevt Listener
playBtn.addEventListener("click", () => (isPlaing ? pauseSong() : playSong()));
