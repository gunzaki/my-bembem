// ============ fill in flower decorations ============
(function () {
  const FLOWER_SVG =
    '<circle cx="50" cy="34" r="15" fill="var(--primary)" opacity="0.85"></circle>' +
    '<circle cx="65" cy="45" r="15" fill="var(--primary)" opacity="0.85"></circle>' +
    '<circle cx="59" cy="64" r="15" fill="var(--primary)" opacity="0.85"></circle>' +
    '<circle cx="41" cy="64" r="15" fill="var(--primary)" opacity="0.85"></circle>' +
    '<circle cx="35" cy="45" r="15" fill="var(--primary)" opacity="0.85"></circle>' +
    '<circle cx="50" cy="50" r="9" fill="var(--lilac-deep)"></circle>';
  document.querySelectorAll("svg.flower").forEach((el) => {
    el.innerHTML = FLOWER_SVG;
  });
})();

// ============ date lock ============
(function () {
  const UNLOCK_DATE = new Date(2026, 8, 4, 0, 0, 0); // September 4, 2026, local time
  const LOCK_ENABLED = true;

  const lockScreen = document.getElementById("lock-screen");
  const envelopeScreen = document.getElementById("envelope-screen");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    const now = new Date();
    const diff = UNLOCK_DATE - now;

    if (!LOCK_ENABLED || diff <= 0) {
      lockScreen.classList.add("hidden");
      envelopeScreen.classList.remove("hidden");
      clearInterval(timerId);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  const now = new Date();
  if (LOCK_ENABLED && now < UNLOCK_DATE) {
    lockScreen.classList.remove("hidden");
    envelopeScreen.classList.add("hidden");
  } else {
    lockScreen.classList.add("hidden");
    envelopeScreen.classList.remove("hidden");
  }

  var timerId = null;
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
})();

// ============ floating hearts & petals ============
const HEART_PATH =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z";
const NS = "http://www.w3.org/2000/svg";

function spawnHearts(container, count = 8) {
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const size = 10 + Math.random() * 16;
    const duration = 12 + Math.random() * 14;
    const delay = Math.random() * 14;
    const opacity = 0.15 + Math.random() * 0.3;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("falling-heart");
    svg.style.left = `${left}%`;
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.animationDuration = `${duration}s`;
    svg.style.animationDelay = `${delay}s`;
    svg.style.setProperty("--heart-opacity", opacity);

    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", HEART_PATH);
    svg.appendChild(path);
    container.appendChild(svg);
  }
}

const FLOWER_INNER =
  '<circle cx="50" cy="34" r="15" fill="var(--primary)"></circle>' +
  '<circle cx="65" cy="45" r="15" fill="var(--primary)"></circle>' +
  '<circle cx="59" cy="64" r="15" fill="var(--primary)"></circle>' +
  '<circle cx="41" cy="64" r="15" fill="var(--primary)"></circle>' +
  '<circle cx="35" cy="45" r="15" fill="var(--primary)"></circle>' +
  '<circle cx="50" cy="50" r="9" fill="var(--lilac-deep)"></circle>';

function spawnPetals(container, count = 7) {
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const size = 16 + Math.random() * 16;
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * 16;
    const opacity = 0.35 + Math.random() * 0.4;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("falling-petal");
    svg.style.left = `${left}%`;
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.animationDuration = `${duration}s`;
    svg.style.animationDelay = `${delay}s`;
    svg.style.setProperty("--petal-opacity", opacity);
    svg.innerHTML = FLOWER_INNER;
    container.appendChild(svg);
  }
}

document.querySelectorAll(".floating-hearts").forEach((el) => {
  spawnHearts(el);
  spawnPetals(el);
});

// ============ envelope open ============
const envelopeScreen = document.getElementById("envelope-screen");
const envelopeContent = document.getElementById("envelope-content");
const slidesScreen = document.getElementById("slides-screen");
const openBtn = document.getElementById("open-btn");

openBtn.addEventListener("click", () => {
  envelopeContent.classList.add("opening");
  setTimeout(() => {
    envelopeScreen.classList.add("hidden");
    slidesScreen.classList.remove("hidden");
    initSlides();
  }, 900);
});

// ============ slide deck ============
let slidesInitialized = false;

function initSlides() {
  if (slidesInitialized) return;
  slidesInitialized = true;

  const track = document.getElementById("slide-track");
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById("slide-dots");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let current = 0;
  const total = slides.length;

  // build dots
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `slide ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(total - 1, index));
    render();
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  document.addEventListener("keydown", (e) => {
    if (slidesScreen.classList.contains("hidden")) return;
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft") goTo(current - 1);
  });

  // swipe support
  let touchStartX = null;
  const viewport = document.querySelector(".slides-viewport");
  viewport.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  viewport.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const threshold = 40;
      if (dx > threshold) goTo(current - 1);
      else if (dx < -threshold) goTo(current + 1);
      touchStartX = null;
    },
    { passive: true }
  );

  render();
}
