// Zaios Games — impostazioni del sito.
// Quando un link è pronto, scrivilo qui tra le virgolette: la pagina si aggiorna da sola.
// Un link vuoto ("") fa sparire il collegamento dalla pagina.
const LINKS = {
  steam: "",            // es. "https://store.steampowered.com/app/1234560/Groundwork/"
  youtubeId: "",        // solo l'ID del teaser, es. "dQw4w9WgXcQ"
  discord: "",          // link d'invito, da inserire quando apri il server al pubblico
  x: "https://x.com/zaiosstudio",          // valido dopo aver rinominato @zarointeractive
  itch: "https://zaiosstudio.itch.io",     // valido dopo aver rinominato zarointeractive.itch.io
  email: "contact@zaiosstudio.com",        // la casella deve esistere prima di mettere online il sito
};

// Logo Zaios: la Z a fulmine è un disegno unico, inserito dove c'è <svg data-z>.
const Z_PATH = "M6 4H56V13L31 37H41L15 66H56V76H4V67L29 43H19L44 13H6Z";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("svg[data-z]").forEach((svg, i) => {
    const id = "zg" + i;
    svg.setAttribute("viewBox", "0 0 60 80");
    svg.innerHTML =
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#1450C8"/><stop offset="1" stop-color="#0B2A6B"/></linearGradient></defs>' +
      '<path d="' + Z_PATH + '" fill="url(#' + id + ')" stroke="#35C8FF" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="' + Z_PATH + '" fill="none" stroke="#E6F7FF" stroke-width="1.6" stroke-linejoin="round"/>';
  });

  // Pulsante principale: wishlist se c'è la pagina Steam, altrimenti "segui su X".
  document.querySelectorAll("[data-cta]").forEach((a) => {
    if (LINKS.steam) {
      a.href = LINKS.steam;
      a.querySelector("[data-cta-label]").textContent = "Wishlist on Steam";
    } else if (LINKS.x) {
      a.href = LINKS.x;
      a.querySelector("[data-cta-label]").textContent = "Follow development";
    } else {
      a.hidden = true;
    }
  });

  // Link generici: data-link="x" | "itch" | "discord" | "steam". Se vuoto, l'elemento sparisce.
  document.querySelectorAll("[data-link]").forEach((el) => {
    const url = LINKS[el.dataset.link];
    if (url) el.href = url; else el.hidden = true;
  });
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.href = "mailto:" + LINKS.email;
    el.textContent = LINKS.email;
  });

  // Teaser: compare solo quando c'è l'ID di YouTube.
  const video = document.getElementById("teaser");
  if (video) {
    if (LINKS.youtubeId) {
      const f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(LINKS.youtubeId) + "?rel=0";
      f.title = "Groundwork teaser";
      f.loading = "lazy";
      f.allow = "accelerometer; encrypted-media; picture-in-picture";
      f.allowFullscreen = true;
      video.appendChild(f);
    } else {
      video.hidden = true;
    }
  }

  // Confronto giorno 1 / giorno 1000.
  document.querySelectorAll(".compare").forEach((box) => {
    const range = box.querySelector("input");
    const after = box.querySelector(".after");
    const handle = box.querySelector(".handle");
    const set = (v) => {
      after.style.clipPath = "inset(0 0 0 " + v + "%)";
      handle.style.left = v + "%";
    };
    range.addEventListener("input", () => set(range.value));
    set(range.value);
  });

  // Immagine mancante: resta lo sfondo di riserva invece dell'icona rotta.
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => { img.style.visibility = "hidden"; });
  });

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
