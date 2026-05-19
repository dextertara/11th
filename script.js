const boxBtn = document.getElementById("boxBtn");
const surprise = document.getElementById("surprise");
const vinylBtn = document.getElementById("vinylBtn");
const music = document.getElementById("music");
const hintText = document.getElementById("hintText"); // Added to hide hint

let isBoxOpen = false;
let isPlaying = false;
let closeTimer = null;
let diskTimer = null;

// Hide hint on interaction
function hideHint() {
  if (hintText && !hintText.classList.contains("hidden")) {
    hintText.classList.add("hidden");
  }
}

function openBox() {
  hideHint();
  clearTimeout(closeTimer);
  isBoxOpen = true;

  boxBtn.classList.add("opened");
  boxBtn.setAttribute("aria-label", "Close box");

  surprise.classList.remove("closing");
  surprise.classList.add("show");
  surprise.setAttribute("aria-hidden", "false");
}

function closeBox() {
  isBoxOpen = false;

  boxBtn.classList.remove("opened");
  boxBtn.setAttribute("aria-label", "Open box");

  surprise.classList.add("closing");

  closeTimer = setTimeout(() => {
    surprise.classList.remove("show", "closing");
    surprise.setAttribute("aria-hidden", "true");
  }, 420); // Syncs with the returnToBox CSS animation time
}

boxBtn.addEventListener("click", () => {
  isBoxOpen ? closeBox() : openBox();
});

function stopMusic() {
  if (!isPlaying && !vinylBtn.classList.contains("playing")) return;

  isPlaying = false;
  music.pause();
  music.currentTime = 0;

  vinylBtn.classList.remove("playing");
  vinylBtn.classList.add("returning");

  clearTimeout(diskTimer);
  diskTimer = setTimeout(() => {
    vinylBtn.classList.remove("returning");
  }, 480);
}

vinylBtn.addEventListener("click", () => {
  hideHint();
  if (isPlaying) {
    stopMusic();
    return;
  }

  clearTimeout(diskTimer);
  vinylBtn.classList.remove("returning");
  vinylBtn.classList.add("playing");

  music.play()
    .then(() => {
      isPlaying = true;
    })
    .catch(() => {
      // Browsers may block autoplay if no interaction has happened
      isPlaying = false;
      vinylBtn.classList.remove("playing");
    });
});

music.addEventListener("ended", stopMusic);