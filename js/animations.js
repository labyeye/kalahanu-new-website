// ============================================================
// animations.js — Kalahanu Bothra Group
// Scroll-triggered reveals, counters, and homepage interactions
// ============================================================

// ===================================
// 1. SCROLL REVEAL — IntersectionObserver
//    Watches all .reveal-up / .reveal-left / .reveal-right elements.
//    Adds .revealed with optional data-delay stagger.
// ===================================
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || "0", 10);

        setTimeout(() => {
          el.classList.add("revealed");
        }, delay);

        observer.unobserve(el);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -55px 0px",
    },
  );

  revealEls.forEach((el) => observer.observe(el));
})();

// ===================================
// 2. TRANSPARENT NAVBAR — Homepage
//    Complements main.js scroll handler.
//    main.js adds/removes .scrolled at 50px;
//    our CSS uses .navbar-home.scrolled for the dark blur.
//    No duplicate listener needed — main.js already handles it.
// ===================================

// ===================================
// 3. HERO STAT COUNTERS
//    Animates .hero-stat-number elements on page load
//    after a brief delay (hero animation sequence).
// ===================================
(function initHeroCounters() {
  const heroNums = document.querySelectorAll(".hero-stat-number");
  if (!heroNums.length) return;

  function countUp(el) {
    const target = parseInt(el.dataset.target || "0", 10);
    const duration = 2200;
    const fps = 60;
    const increment = target / (duration / (1000 / fps));
    let current = 0;

    function tick() {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    tick();
  }

  // Start counters after the hero stagger sequence finishes (~1.8s)
  setTimeout(() => {
    heroNums.forEach(countUp);
  }, 1800);
})();

// ===================================
// 4. CLIENTS SECTION COUNTERS
//    Triggers when the .clients-stat-row enters the viewport.
// ===================================
(function initClientCounters() {
  const statRow = document.querySelector(".clients-stat-row");
  if (!statRow) return;

  const csNums = statRow.querySelectorAll(".cs-num");
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || animated) return;
        animated = true;

        csNums.forEach((el) => {
          const target = parseInt(el.dataset.target || "0", 10);
          const duration = 2000;
          const increment = target / (duration / (1000 / 60));
          let current = 0;

          function tick() {
            current += increment;
            if (current < target) {
              el.textContent = Math.floor(current);
              requestAnimationFrame(tick);
            } else {
              el.textContent = target;
            }
          }

          tick();
        });

        observer.disconnect();
      });
    },
    { threshold: 0.4 },
  );

  observer.observe(statRow);
})();

// ===================================
// 5. ABOUT IMAGE BORDER TRACE
//    Adds .revealed to .about-image-wrap and .gold-divider
//    when they enter the viewport, triggering CSS transitions.
// ===================================
(function initAboutReveal() {
  const targets = [
    document.querySelector(".about-image-wrap"),
    document.querySelector(".gold-divider"),
  ].filter(Boolean);

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.25 },
  );

  targets.forEach((el) => observer.observe(el));
})();

// ===================================
// 6. FOOTER GOLD LINE REVEAL
//    Expands the animated gold separator when footer enters view.
// ===================================
(function initFooterGoldLine() {
  const goldLine = document.querySelector(".footer-gold-line");
  if (!goldLine) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        goldLine.classList.add("revealed");
        observer.disconnect();
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(goldLine);
})();

// ===================================
// 7. FOUNDER MESSAGE — Paragraph stagger
//    Fades in each paragraph with a delay when section is visible.
// ===================================
(function initFounderReveal() {
  const section = document.querySelector(".founder-section");
  if (!section) return;

  const paragraphs = section.querySelectorAll(".founder-message");
  if (!paragraphs.length) return;

  // Set initial hidden state
  paragraphs.forEach((p) => {
    p.style.opacity = "0";
    p.style.transform = "translateY(18px)";
    p.style.transition = "opacity 0.65s ease, transform 0.65s ease";
  });

  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;

        paragraphs.forEach((p, i) => {
          setTimeout(() => {
            p.style.opacity = "1";
            p.style.transform = "translateY(0)";
          }, i * 280);
        });

        observer.disconnect();
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(section);
})();

// ===================================
// 8. ACTIVE NAV LINK — Scroll Spy
//    Highlights the correct .nav-link as user scrolls sections.
// ===================================
(function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("a.nav-link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", isMatch);
        });
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-80px 0px 0px 0px",
    },
  );

  sections.forEach((s) => observer.observe(s));
})();

// ===================================
// 9. COMPANY CARD — Checklist stagger on hover
//    Staggers the checklist bullets inside each card on mouseenter.
// ===================================
(function initChecklistStagger() {
  const checklists = document.querySelectorAll(".about-checklist");
  checklists.forEach((list) => {
    const items = list.querySelectorAll("li");
    items.forEach((li, i) => {
      li.style.transitionDelay = `${i * 80}ms`;
    });
  });
})();

// ===================================
// DEV: Console signature
// ===================================
console.log(
  "%cKalahanu Bothra Group",
  "font-size: 16px; font-weight: 800; color: #d49d35; text-shadow: 0 1px 2px rgba(0,0,0,0.5);",
);
console.log(
  "%cPremium Corporate Website — Powered by Pixelate Nest",
  "font-size: 11px; color: #b78347;",
);
