/*
 * The mobile menu works without JavaScript (a checkbox drives it in CSS).
 * This file adds the ARIA state, Enter to open, focus handling for keyboard
 * users, close-on-navigate, close on Escape, and a clean slate on
 * back/forward navigation.
 */
(function () {
  var menuToggle = document.getElementById("menu-toggle");

  if (!menuToggle) {
    return;
  }

  function setMenuOpen(isOpen) {
    menuToggle.checked = isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  menuToggle.addEventListener("change", function () {
    menuToggle.setAttribute("aria-expanded", String(menuToggle.checked));

    // The toggle is hidden while the menu is open, so a keyboard user who
    // opened it needs focus moved to the first link.
    if (menuToggle.checked && document.activeElement === menuToggle) {
      var first = document.querySelector(".navigation a");
      if (first) {
        first.focus();
      }
    }
  });

  // A checkbox only answers to Space; let Enter open the menu as well.
  menuToggle.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      menuToggle.click();
    }
  });

  document.querySelectorAll(".navigation a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuToggle.checked) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("pagehide", function () {
    setMenuOpen(false);
  });

  window.addEventListener("pageshow", function () {
    setMenuOpen(false);
  });
})();
