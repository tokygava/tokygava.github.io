document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const storageKey = "apple-silicon-theme";

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      navToggle.classList.toggle("nav-toggle--open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (nav && navToggle && window.innerWidth < 768) {
        nav.classList.remove("nav--open");
        navToggle.classList.remove("nav-toggle--open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Theme
  if (themeToggle) {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark") {
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
    }

    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("theme-dark");
      if (isDark) {
        body.classList.remove("theme-dark");
        body.classList.add("theme-light");
        localStorage.setItem(storageKey, "light");
      } else {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
        localStorage.setItem(storageKey, "dark");
      }
    });
  }
});
