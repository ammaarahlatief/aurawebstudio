document.addEventListener("DOMContentLoaded", () => {
  // 1. Current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Top scroll bar and sticky header shadow
  const progressEl = document.getElementById("scrollProgress");
  const headerEl = document.getElementById("siteHeader");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressEl) progressEl.style.width = `${progress}%`;
    if (headerEl) headerEl.classList.toggle("scrolled", scrollTop > 20);
  }, { passive: true });

  // 3. Mobile menu toggle
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. Fade and slide things in as you scroll
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  // 5. Soft mint glow following the mouse on cards
  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 6. Gentle button movement on hover
  document.querySelectorAll(".btn-magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // 7. Desktop and mobile preview switch in past builds
  document.querySelectorAll(".portfolio-card").forEach((card) => {
    const buttons = card.querySelectorAll(".device-btn");
    const stage = card.querySelector(".preview-stage");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (stage) stage.dataset.mode = btn.dataset.view;
      });
    });
  });

  // 8. Package pick, care plan toggle, currency toggle, and WhatsApp message
  let selectedPackage = "Free Consultation (General Chat)";
  let includeCarePlan = false;

  const selectedLabel = document.getElementById("selectedPackageLabel");
  const whatsappLink = document.getElementById("whatsappLink");
  const careToggle = document.getElementById("careToggle");
  const currButtons = document.querySelectorAll(".curr-btn");
  const priceCards = document.querySelectorAll(".price-card");

  function updateEnquiryLinks() {
    const fullScope = includeCarePlan
      ? `${selectedPackage} + Care Plan (R450/month)`
      : selectedPackage;

    if (selectedLabel) selectedLabel.textContent = fullScope;

    if (whatsappLink) {
      const msg = `Hi Ammaarah, I'd like to have a free chat about: ${fullScope}.`;
      whatsappLink.href = `https://wa.me/27839561961?text=${encodeURIComponent(msg)}`;
    }
  }

  document.querySelectorAll(".package-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedPackage = btn.dataset.package || "Free Consultation";
      updateEnquiryLinks();
      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (careToggle) {
    careToggle.addEventListener("change", () => {
      includeCarePlan = careToggle.checked;
      updateEnquiryLinks();
    });
  }

  const currencyFormat = {
    ZAR: { symbol: "R", key: "zar" },
    USD: { symbol: "$", key: "usd" },
    GBP: { symbol: "£", key: "gbp" }
  };

  currButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const curr = btn.dataset.curr || "ZAR";
      const cfg = currencyFormat[curr];

      priceCards.forEach((card) => {
        const amountEl = card.querySelector(".price-amount");
        const val = Number(card.dataset[cfg.key]);
        if (amountEl && val) {
          amountEl.textContent = `${cfg.symbol}${val.toLocaleString()}`;
        }
      });
    });
  });

  // 9. Open and close FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      questionBtn.setAttribute("aria-expanded", String(isOpen));
    });
  });
});