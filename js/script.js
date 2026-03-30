
// Beschrijving per regel over wat de code doet in script.js:

// =============================================
//  Kids Adventure Game - Homepage Script
// =============================================

// ---- Mobile Nav Toggle ----
(function setupMobileNav() {                        // IIFE voor mobile navigatie
  const toggle = document.querySelector(".mobile-nav-toggle"); // Selecteren van hamburgerknop
  const mobileNav = document.querySelector(".mobile-nav");     // Selecteren van mobiel navigatiemenu
  if (!toggle || !mobileNav) return;                           // Stoppen als elementen ontbreken

  toggle.addEventListener("click", () => {            // Klik op hamburgerknop
    mobileNav.classList.toggle("open");               // Toggle de 'open' class op het menu
    // Hamburger animatie
    const bars = toggle.querySelectorAll(".hamburger"); // Selecteer hamburger lijnen
    bars.forEach((b) => b.classList.toggle("active"));  // Toggle 'active' class voor animatie
  });

  // Sluit menu als je ergens anders klikt
  document.addEventListener("click", (e) => { // Luistert op hele document
    if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove("open");    // Verberg mobiel menu als iemand buiten menu klikt
    }
  });
})();

// ---- Floating Particles Achtergrond ----
(function createParticles() {                            // IIFE voor achtergronddeeltjes
  const canvas = document.createElement("canvas");       // Maak canvas-element aan
  canvas.id = "particles-canvas";                        // ID geven voor styling
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.45;
  `;                                                    // Canvas styling (over hele scherm)
  document.body.prepend(canvas);                        // Voeg canvas toe aan bovenkant body

  const ctx = canvas.getContext("2d");                  // Haal 2D canvas context op
  let W = (canvas.width = window.innerWidth);           // Zet canvas breedte op windowbreedte
  let H = (canvas.height = window.innerHeight);         // Zet canvas hoogte op windowhoogte

  const COLORS = [       // Kleurenarray voor deeltjes
    "#1f7fec", "#ff0055", "#11ce00",
    "#ec4899", "#8b5cf6", "#22c5d2",
  ];

  const particles = Array.from({ length: 55 }, () => ({  // Genereer 55 willekeurige deeltjes
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.6 + 0.2,
  }));

  function draw() {                        // Tekenfunctie voor alle deeltjes
    ctx.clearRect(0, 0, W, H);             // Maak canvas eerst leeg
    particles.forEach((p) => {             // Loop door alle deeltjes
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); // Teken cirkel
      ctx.fillStyle = p.color;             // Stel kleur in
      ctx.globalAlpha = p.alpha;           // Stel transparantie in
      ctx.fill();

      p.x += p.dx;                         // Verplaats deeltje horizontaal
      p.y += p.dy;                         // Verplaats deeltje verticaal

      if (p.x < 0 || p.x > W) p.dx *= -1;  // Bots tegen linker/rechterrand
      if (p.y < 0 || p.y > H) p.dy *= -1;  // Bots tegen boven/onderrand
    });
    ctx.globalAlpha = 1;                   // Reset alpha naar standaard
    requestAnimationFrame(draw);           // Herhaal animatie
  }

  draw();                                  // Start de animatie

  window.addEventListener("resize", () => {        // Pas canvas aan bij schermresizing
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
})();

// ---- Game Card Hover Sparkle Effect ----
(function setupCardEffects() {                      // IIFE voor interactiviteit op game-cards
  const cards = document.querySelectorAll(".game-card");    // Selecteer alle game-cards

  cards.forEach((card) => {                                // Voor elke kaart:
    card.addEventListener("mousemove", (e) => {            // Beweeg muis over kaart
      const rect = card.getBoundingClientRect();           // Haal positie & maat van kaart op
      const x = e.clientX - rect.left;                     // Muismuispositie binnen de kaart
      const y = e.clientY - rect.top;

      // Tilt effect
      const centerX = rect.width / 2;                      // Bepaal midden van kaart
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;      // Bereken rotatie X
      const rotateY = ((x - centerX) / centerX) * 8;       // Bereken rotatie Y

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`; // Pas transform toe (3D tilt)
      card.style.transition = "transform 0.1s ease";       // Snel reageren
    });

    card.addEventListener("mouseleave", () => {            // Muis verlaat kaart
      card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)"; // Terug naar origineel
      card.style.transition = "transform 0.5s ease";       // Langzamer terugveren
    });
  });
})();

// ---- Nav Link Glow Animatie ----
(function setupNavGlow() {                         // IIFE voor nav link glow-effect
  const navLinks = document.querySelectorAll(".nav a"); // Pak alle nav links
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {         // Muis over link
      link.style.textShadow = "0 0 12px #8bd2fa, 0 0 25px #6247ea"; // Voeg glow toe
    });
    link.addEventListener("mouseleave", () => {         // Muis verlaat link
      link.style.textShadow = "";                       // Verwijder glow
    });
  });
})();

// ---- Titel Letter Animatie ----
(function animateTitleLetters() {                      // IIFE voor titel-animatie
  const titleSpans = document.querySelectorAll(".title h1 span"); // Selecteer losse letters/spans in titel
  titleSpans.forEach((span, i) => {
    span.style.display = "inline-block";                         // Zorg dat alle spans blok zijn
    span.style.opacity = "0";                                    // Begin onzichtbaar
    span.style.transform = "translateY(-20px)";                  // Begin iets omhooggeschoven
    span.style.transition = `opacity 0.5s ease ${i * 0.18}s, transform 0.5s ease ${i * 0.18}s`; // Animatie met vertraging per letter

    setTimeout(() => {
      span.style.opacity = "1";                                  // Word zichtbaar
      span.style.transform = "translateY(0)";                    // Glide naar beneden
    }, 100);                                                     // Kleine delay voor effect
  });
})();

// Einde van de stap-voor-stap uitleg.
// De code hierboven voegt interactieve en visuele animaties toe aan de homepage, zodat deze er speelser en uitnodigend uitziet.