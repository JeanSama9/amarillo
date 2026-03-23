// Configuracion principal.
const CONFIG = {
  // Cambia esta fecha por el momento en que empezaron a salir.
  // Formato recomendado: YYYY-MM-DDTHH:MM:SS
  startDate: "2025-01-01T00:00:00"
};

// Textos configurables de la experiencia.
const APP_COPY = {
  coverTitle: "Flores Para Ti",
  coverHint: "Toca para abrir la carta",
  cardTitle: "Flores Amarillas para el amor de mi vida:",
  messageLines: [
    "Si pudiera elegir un lugar seguro, sería a tu lado.",
    "Cuanto más tiempo estoy contigo, más te amo."
  ],
  counterLabel: "Mi amor por ti comenzó hace..."
};

const startDate = createSafeDate(CONFIG.startDate);

const state = {
  timerId: null
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  const elements = getElements();

  applyCopy(elements);
  createPetals(elements.petalLayer, prefersReducedMotion ? 6 : 12);
  setupInteractions(elements);
  updateCounter(elements.counterParts);
  startCounter(elements.counterParts);
});

function getElements() {
  return {
    body: document.body,
    coverButton: document.getElementById("openExperience"),
    coverTitle: document.getElementById("coverTitle"),
    coverHint: document.getElementById("coverHint"),
    loveCard: document.getElementById("loveCard"),
    cardTitle: document.getElementById("cardTitle"),
    messageTexts: document.querySelectorAll(".message-block__text"),
    counterLabel: document.querySelector(".counter-block__label"),
    counterDateText: document.getElementById("counterDateText"),
    petalLayer: document.getElementById("petalLayer"),
    counterParts: {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds")
    }
  };
}

function applyCopy(elements) {
  elements.coverTitle.textContent = APP_COPY.coverTitle;
  elements.coverHint.textContent = APP_COPY.coverHint;
  elements.cardTitle.textContent = APP_COPY.cardTitle;
  elements.counterLabel.textContent = APP_COPY.counterLabel;
  elements.counterDateText.textContent = `Desde el ${formatDate(startDate)}`;

  elements.messageTexts.forEach((node, index) => {
    node.textContent = APP_COPY.messageLines[index] ?? "";
  });
}

function setupInteractions(elements) {
  elements.coverButton.addEventListener("click", () => openExperience(elements));

  elements.coverButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openExperience(elements);
    }
  });
}

function openExperience(elements) {
  if (elements.body.classList.contains("is-open")) {
    return;
  }

  elements.body.classList.add("is-open");
  elements.loveCard.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    elements.loveCard.focus({ preventScroll: true });
    elements.loveCard.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center"
    });
  }, prefersReducedMotion ? 50 : 320);
}

function startCounter(counterParts) {
  if (state.timerId) {
    window.clearInterval(state.timerId);
  }

  state.timerId = window.setInterval(() => {
    updateCounter(counterParts);
  }, 1000);
}

function updateCounter(counterParts) {
  const now = new Date();
  const difference = Math.max(0, now.getTime() - startDate.getTime());

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  counterParts.days.textContent = String(days).padStart(3, "0");
  counterParts.hours.textContent = String(hours).padStart(2, "0");
  counterParts.minutes.textContent = String(minutes).padStart(2, "0");
  counterParts.seconds.textContent = String(seconds).padStart(2, "0");
}

function createPetals(layer, amount) {
  if (!layer) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < amount; index += 1) {
    const petal = document.createElement("span");
    const size = randomBetween(10, 18);
    const duration = prefersReducedMotion ? 0.01 : randomBetween(5.5, 10.5);
    const delay = prefersReducedMotion ? 0 : randomBetween(-10, 0);
    const drift = `${randomBetween(-250, -120)}px`;
    const rotation = `${randomBetween(180, 340)}deg`;

    petal.className = "petal";
    // Las hojas nacen cerca de la copa del árbol y el viento las empuja hacia la izquierda.
    petal.style.left = `${randomBetween(62, 86)}%`;
    petal.style.top = `${randomBetween(14, 37)}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 0.74}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty("--drift-x", drift);
    petal.style.setProperty("--rotate-end", rotation);
    petal.style.opacity = `${randomBetween(0.62, 0.9)}`;

    fragment.appendChild(petal);
  }

  layer.appendChild(fragment);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function formatDate(date) {
  if (Number.isNaN(date.getTime())) {
    return "una fecha especial";
  }

  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function createSafeDate(dateString) {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) {
    console.warn(
      `La fecha "${dateString}" no es valida. Usa el formato YYYY-MM-DDTHH:MM:SS.`
    );
    return new Date();
  }

  return parsedDate;
}
