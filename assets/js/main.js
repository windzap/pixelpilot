/* PixelPilot — word animations. Respects reduced motion; content stays readable without JS. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Split headings into words that rise in one after another.
  document.querySelectorAll("[data-split]").forEach(function (el) {
    var text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.innerHTML = text.split(/\s+/).map(function (w, i) {
      return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + w + "</span></span>";
    }).join(" ");
  });

  // 2. Reveal when scrolled into view.
  var targets = document.querySelectorAll("[data-split], .fade");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    targets.forEach(function (el) { io.observe(el); });
  }

  // 3. Rotating word: Google, ChatGPT, Gemini, Google AI.
  if (reduce) return;
  document.querySelectorAll("[data-rotate]").forEach(function (box) {
    var items = box.children, i = 0;
    setInterval(function () {
      var cur = items[i], next = items[(i + 1) % items.length];
      cur.classList.remove("on"); cur.classList.add("out");
      next.classList.remove("out"); next.classList.add("on");
      setTimeout(function () { cur.classList.remove("out"); }, 600);
      i = (i + 1) % items.length;
    }, 2200);
  });
})();
