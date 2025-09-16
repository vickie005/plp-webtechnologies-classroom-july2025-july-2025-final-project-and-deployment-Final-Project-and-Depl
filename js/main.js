// robust theme toggle, navbar shrink, smooth-scroll
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const saved = localStorage.getItem("ww-theme"); // 'light' or 'dark'
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved || (prefersLight ? "light" : "dark");

  if (initial === "light") body.classList.add("light-mode");
  else body.classList.remove("light-mode");

  // Update toggle UI 
  function updateToggleUI() {
    if (!themeToggle) return;
    if (body.classList.contains("light-mode")) {
      themeToggle.textContent = "🌙"; // clicking will switch to dark
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
      themeToggle.title = "Switch to dark mode";
    } else {
      themeToggle.textContent = "☀️"; // clicking will switch to light
      themeToggle.setAttribute("aria-label", "Switch to light mode");
      themeToggle.title = "Switch to light mode";
    }
  }
  updateToggleUI();

  // Click handler
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = body.classList.toggle("light-mode");
      localStorage.setItem("ww-theme", isLight ? "light" : "dark");
      updateToggleUI();
    });
  } else {
    console.warn("[main.js] theme toggle button (#theme-toggle) not found.");
  }

  // Navbar shrink on scroll
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Smooth internal link scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
