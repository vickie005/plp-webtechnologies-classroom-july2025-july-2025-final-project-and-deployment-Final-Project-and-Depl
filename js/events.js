const filterButtons = document.querySelectorAll(".filter-btn");
const eventItems = document.querySelectorAll(".event-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    eventItems.forEach((item) => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
        item.classList.add("fade-in");
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Simple animation effect (fade-in)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

eventItems.forEach((item) => observer.observe(item));
