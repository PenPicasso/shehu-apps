(function () {
  function track(name, detail = {}) {
    if (!name) return;
    window.dispatchEvent(new CustomEvent("ovrin:event", { detail: { name, ...detail } }));
    if (window.dataLayer) window.dataLayer.push({ event: name, ...detail });
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-event]");
    if (!target) return;
    if (target.matches("button[type='submit']")) return;
    track(target.dataset.event, { label: target.getAttribute("aria-label") || target.textContent.trim().slice(0, 80) });
  });

  document.querySelectorAll("details[data-event]").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) track(item.dataset.event, { question: item.querySelector("summary")?.textContent.trim() });
    });
  });

  const motionLayer = document.querySelector(".hero-motion-layer");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function formatCount(value, item) {
    if (item.dataset.countTime === "true") {
      const totalMinutes = Math.round(value);
      const hour = Math.floor(totalMinutes / 60);
      const minute = (totalMinutes % 60).toString().padStart(2, "0");
      return `${hour}:${minute}${item.dataset.countSuffix || ""}`;
    }
    const rounded = Math.round(value);
    const formatted = item.dataset.countFormat === "comma" ? rounded.toLocaleString("en-US") : String(rounded);
    return `${item.dataset.countPrefix || ""}${formatted}${item.dataset.countSuffix || ""}`;
  }

  function runCounter(item, delay = 0) {
    const target = Number(item.dataset.countTo || 0);
    if (!target) return;
    if (reduceMotion) {
      item.textContent = formatCount(target, item);
      return;
    }
    const duration = 1500;
    const startAt = performance.now() + delay;
    const tick = (now) => {
      const elapsed = Math.max(0, now - startAt);
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      item.textContent = formatCount(target * eased, item);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if (motionLayer && !reduceMotion && window.gsap) {
    const gsap = window.gsap;
    gsap.set(".hero-counter", { opacity: 0, y: 8 });
    gsap.to(".pipe-energy", { xPercent: 28, opacity: .82, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-visual-wrap picture img", { y: -2, scale: 1.004, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".crack-pulse", { scale: 1.22, opacity: .12, duration: 1.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".route", { strokeDashoffset: -38, duration: 1.5, repeat: -1, ease: "none", stagger: .14 });

    gsap.utils.toArray(".motion-drop").forEach((drop, index) => {
      gsap.to(drop, {
        opacity: 1,
        y: gsap.utils.wrap([88, 114, 74, 98], index),
        scaleY: gsap.utils.wrap([1.18, 1.28, 1.08, 1.15], index),
        duration: gsap.utils.wrap([1.45, 1.9, 1.25, 1.65], index),
        delay: index * .28,
        repeat: -1,
        ease: "power1.in",
        repeatDelay: gsap.utils.wrap([.18, .3, .38, .25], index),
        onRepeat() {
          gsap.set(drop, { opacity: 0, y: 0, scaleY: 1 });
        }
      });
    });

    gsap.to(".hero-counter", { opacity: 1, y: 0, duration: .55, delay: .45, stagger: .24, ease: "power2.out" });
    document.querySelectorAll(".hero-counter").forEach((item, index) => runCounter(item, 560 + index * 240));
  } else {
    document.querySelectorAll(".hero-counter").forEach((item) => runCounter(item));
  }

  const form = document.querySelector("[data-leak-audit-form]");
  if (form) {
    let started = false;
    form.addEventListener("input", () => {
      if (started) return;
      started = true;
      track(form.dataset.eventStart || "form_started");
    }, { once: true });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const payload = new FormData(form);
      sessionStorage.setItem("ovrin_leak_audit", JSON.stringify(Object.fromEntries(payload.entries())));
      track(form.dataset.event || "form_submitted");
      window.location.href = "/thank-you";
    });
  }
})();
