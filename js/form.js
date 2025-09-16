document.addEventListener("DOMContentLoaded", () => {
  const form =
    document.getElementById("join-form") || document.querySelector("form");
  if (!form) {
    console.error("[form.js] No form found (#join-form or <form>)");
    return;
  }

  // inputs 
  const nameInput =
    document.getElementById("name") || form.querySelector('[name="name"]');
  const emailInput =
    document.getElementById("email") || form.querySelector('[name="email"]');
  const messageInput =
    document.getElementById("message") ||
    form.querySelector('[name="message"]');

  // message container 
  let formMessage = document.getElementById("form-message");
  if (!formMessage) {
    formMessage = document.createElement("p");
    formMessage.id = "form-message";
    form.insertAdjacentElement("afterend", formMessage);
  }
  formMessage.setAttribute("aria-live", "polite");

  // attach submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("[form.js] submit event fired");

    // CLEANUP previous errors
    [nameInput, emailInput, messageInput].forEach((inp) => {
      if (!inp) return;
      inp.classList.remove("error-input");
      const nxt = inp.nextElementSibling;
      if (nxt && nxt.classList.contains("error-text")) nxt.remove();
    });
    formMessage.textContent = "";
    formMessage.className = "";

    // Validation
    const invalid = [];

    if (!nameInput || nameInput.value.trim().length < 3) {
      invalid.push(nameInput);
      showError(nameInput, "Name must be at least 3 characters.");
    }

    if (!emailInput || !validateEmail(emailInput.value)) {
      invalid.push(emailInput);
      showError(emailInput, "Enter a valid email address.");
    }

    if (!messageInput || messageInput.value.trim().length < 10) {
      invalid.push(messageInput);
      showError(messageInput, "Message must be at least 10 characters.");
    }

    if (invalid.length > 0) {
      formMessage.textContent = "❌ Please fix the errors above.";
      formMessage.classList.add("error");
      if (invalid[0]) invalid[0].focus();
      return;
    }

    // Simulate sending
    formMessage.textContent = "✉️ Sending...";
    formMessage.classList.add("sending");

    setTimeout(() => {
      formMessage.textContent = "✅ Message sent successfully!";
      formMessage.className = "success";
      form.reset();
      if (nameInput) nameInput.focus();
    }, 700);
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showError(input, message) {
    if (!input) return;
    input.classList.add("error-input");
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-text")) {
      error = document.createElement("small");
      error.classList.add("error-text");
      input.insertAdjacentElement("afterend", error);
    }
    error.textContent = message;
  }
});
