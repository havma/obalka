const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.25 }
);

reveals.forEach((el) => io.observe(el));

const romanticAudio = document.getElementById("romanticAudio");
const shouldAutoplay = localStorage.getItem("romanticAutoplay") === "1";

if (romanticAudio && shouldAutoplay) {
  const tryPlay = () => {
    const playPromise = romanticAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay can be blocked; fallback to first user interaction.
      });
    }
  };

  romanticAudio.addEventListener("play", () => {
    localStorage.removeItem("romanticAutoplay");
  });

  window.addEventListener("load", tryPlay, { once: true });
  document.addEventListener("click", tryPlay, { once: true });
}

const result = document.getElementById("result");
const followup = document.getElementById("followup");
const imageContainer = document.getElementById("imageContainer");

const messages = [
  "Miluje jen ten, co oplátkou nic nečeká. Antoine de Saint-Exupéry",
  "Láska je jediná věc, která roste, když ji rozdáváme. Antoine de Saint-Exupéry",
  "Milovat neznamená hledět jeden do druhého, ale pohlížet společně jedním směrem. Antoine de Saint-Exupéry",
  "Nejlepší věc, které se v životě držíme, je jeden druhého. Audrey Hepburn",
  "Pro svět můžeš být jedna osoba, ale pro jednu osobu můžeš být celý svět. Karl Heinrich Waggerl", 
  "V životě je jen jedno štěstí - milovat a být milován. George Sand",
];
const followups = [ 
  "A já jsem čekal jen na tebe. ❤",
  "A já ti ji chci dát všechnu co mám. ❤",
  "A já chci hledět kupředu s tebou. ❤",
  "A já tě budu držet jak jen budu moct. ❤",
  "A ty jsi můj svět. ❤",
  "A já jsem měl to největší štěstí. ❤"
];
let messageIndex = 0;

const nextMessage = () => {
  const text = messages[messageIndex % messages.length];
  const extra = followups[messageIndex % followups.length];
  messageIndex += 1;
  return { text, extra};
};

const showMessage = (mainText, extraText) => {
  result.textContent = mainText;
  followup.textContent = extraText;
  followup.classList.add("is-visible");
  if (imageContainer && imageContainer.childElementCount === 0) {
    const img = document.createElement("img");
    img.src = "images/final.jpg";
    img.alt = "Naše fotka";
    img.className = "final-image is-visible";
    imageContainer.appendChild(img);
  }
};

document.getElementById("yesBtn").addEventListener("click", () => {
  const { text, extra } = nextMessage();
  showMessage(text, extra);
});

document.getElementById("yesBtn2").addEventListener("click", () => {
  const { text, extra } = nextMessage();
  showMessage(text, extra);
});
