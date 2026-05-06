(function () {
  const seenVideoMarks = new Set();

  function track(name, detail = {}) {
    if (!name) return;
    window.dispatchEvent(new CustomEvent("ovrin:event", { detail: { name, ...detail } }));
    if (window.dataLayer) window.dataLayer.push({ event: name, ...detail });
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-event]");
    if (!target) return;
    if (target.matches("[data-vsl-player], button[type='submit']")) return;
    track(target.dataset.event, { label: target.getAttribute("aria-label") || target.textContent.trim().slice(0, 80) });
  });

  document.querySelectorAll("details[data-event]").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) track(item.dataset.event, { question: item.querySelector("summary")?.textContent.trim() });
    });
  });

  const player = document.querySelector("[data-vsl-player]");
  if (player) {
    const progress = player.querySelector(".player-progress");
    player.addEventListener("click", () => {
      if (player.dataset.playing === "true") return;
      player.dataset.playing = "true";
      track(player.dataset.event || "vsl_play_clicked");
      let pct = 10;
      const marks = [
        [25, player.dataset.event25 || "vsl_25_percent_watched"],
        [50, player.dataset.event50 || "vsl_50_percent_watched"],
        [75, player.dataset.event75 || "vsl_75_percent_watched"],
        [100, player.dataset.eventComplete || "vsl_completed"]
      ];
      const timer = window.setInterval(() => {
        pct = Math.min(100, pct + 5);
        if (progress) progress.style.width = `${pct}%`;
        for (const [mark, eventName] of marks) {
          if (pct >= mark && !seenVideoMarks.has(eventName)) {
            seenVideoMarks.add(eventName);
            track(eventName);
          }
        }
        if (pct >= 100) window.clearInterval(timer);
      }, 850);
    });
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
