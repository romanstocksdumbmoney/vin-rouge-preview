(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-mobile-panel]");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var tabs = document.querySelectorAll("[data-menu-tab]");
  var panels = document.querySelectorAll("[data-menu-panel]");
  if (!tabs.length) return;
  function activate(id) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-menu-tab") === id;
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute("data-menu-panel") !== id;
    });
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      activate(t.getAttribute("data-menu-tab"));
    });
  });
  var hash = (location.hash || "").replace(/^#/, "");
  var valid = Array.prototype.some.call(tabs, function (t) {
    return t.getAttribute("data-menu-tab") === hash;
  });
  activate(valid ? hash : tabs[0].getAttribute("data-menu-tab"));
})();
