document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.getElementById("loader");
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navbar nav");
  const navLinks = document.querySelectorAll(".navbar nav a");
  const topBtn = document.getElementById("topBtn");
  const year = document.getElementById("year");

  // Bloque le défilement pendant le chargement.
  body.classList.add("loading");

  // Animation d'entrée du site.
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
      body.classList.remove("loading");
    }, 900);
  });

  // Menu mobile.
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });

  // Détection des éléments visibles : animation au scroll.
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  document.querySelectorAll(".reveal, .reveal-card").forEach(element => {
    revealObserver.observe(element);
  });

  // Navigation active + navbar + bouton retour en haut.
  const sections = document.querySelectorAll("main section[id]");

  function updateScrollUI() {
    const scrollY = window.scrollY;

    navbar.classList.toggle("scrolled", scrollY > 40);
    topBtn.classList.toggle("show", scrollY > 500);

    let current = "accueil";

    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  // Retour en haut.
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Année automatique.
  year.textContent = new Date().getFullYear();

  // Effet léger de parallaxe sur les particules de l'accueil.
  const particles = document.querySelectorAll(".hero-particle");

  window.addEventListener("mousemove", event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;

    particles.forEach((particle, index) => {
      const factor = (index + 1) * 0.7;
      particle.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  // Animation douce des boutons au clavier également.
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        button.style.transform = "scale(.96)";
        setTimeout(() => {
          button.style.transform = "";
        }, 120);
      }
    });
  });
});
