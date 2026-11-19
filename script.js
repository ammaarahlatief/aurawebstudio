document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("primaryNav");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      item.classList.toggle("open", !expanded);
    });
  });

  // Smart WhatsApp package inquiry routing
  const phoneNumber = "27000000000"; // Replace with your WhatsApp number (country code + number, no +)
  const selectedLabel = document.getElementById("selectedPackageLabel");
  const whatsappLink = document.getElementById("whatsappLink");

  const updateWhatsAppHref = (pkgName) => {
    const message = pkgName
      ? `Hi Aura Web Studio, I'd like to inquire about the ${pkgName} package.`
      : "Hi Aura Web Studio, I'd like to chat about a custom website.";
    if (whatsappLink) {
      whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    }
  };

  document.querySelectorAll(".package-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-package") || "General Inquiry";
      if (selectedLabel) {
        selectedLabel.textContent = pkg;
      }
      updateWhatsAppHref(pkg);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  });
});