const header = document.querySelector(".header");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealTargets = document.querySelectorAll(
  ".section-heading, .concept, .commitment-grid article, .menu-card, .split-image, .split-copy, .shop-photo, .shop-info, .instagram > .section-label, .instagram h2, .instagram p, .instagram-grid img, .cta, .notice, .page-hero"
);

revealTargets.forEach((target, index) => {
  target.classList.add("reveal");

  if (
    target.matches(".commitment-grid article, .menu-card, .instagram-grid img")
  ) {
    target.classList.add(`reveal-delay-${(index % 3) + 1}`);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealTargets.forEach((target) => observer.observe(target));

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelector(".hero-dots");
let currentHeroSlide = 0;

if (heroSlides.length > 1 && heroDots) {
  heroSlides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "hero-dot";
    if (index === 0) dot.classList.add("is-active");
    heroDots.appendChild(dot);
  });

  const dots = heroDots.querySelectorAll(".hero-dot");

  const showHeroSlide = (nextIndex) => {
    heroSlides[currentHeroSlide].classList.remove("is-active");
    dots[currentHeroSlide].classList.remove("is-active");

    currentHeroSlide = nextIndex;

    heroSlides[currentHeroSlide].classList.add("is-active");
    dots[currentHeroSlide].classList.add("is-active");
  };

  setInterval(() => {
    const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  }, 4200);
}
