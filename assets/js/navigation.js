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

  var openedByKeyboard = false;

  menuToggle.addEventListener("change", function () {
    menuToggle.setAttribute("aria-expanded", String(menuToggle.checked));

    // The toggle is hidden while the menu is open, so a keyboard user who
    // opened it needs focus moved to the first link. A tap or a click must
    // not do this: it would put focus on Home whatever page is current.
    if (
      menuToggle.checked &&
      openedByKeyboard &&
      document.activeElement === menuToggle
    ) {
      var first = document.querySelector(".navigation a");
      if (first) {
        first.focus();
      }
    }
    openedByKeyboard = false;
  });

  // A checkbox only answers to Space; let Enter open the menu as well, and
  // remember that the keyboard did it.
  menuToggle.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      openedByKeyboard = true;
    }
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

/* The email menu is a <details> element, so it opens without JavaScript.
   This adds hover-to-open for a mouse, and closing on Escape, on a click
   elsewhere, and after an address is chosen. Touch and keyboard keep the
   native tap, Enter and Space toggle. */
(function () {
  var menus = document.querySelectorAll(".mail-menu");

  if (!menus.length) {
    return;
  }

  menus.forEach(function (menu) {
    var summary = menu.querySelector("summary");
    var closeTimer;

    function hoverAllowed(event) {
      return event.pointerType === "mouse";
    }

    menu.addEventListener("pointerenter", function (event) {
      if (hoverAllowed(event)) {
        clearTimeout(closeTimer);
        menu.open = true;
      }
    });

    menu.addEventListener("pointerleave", function (event) {
      if (!hoverAllowed(event)) {
        return;
      }
      // The short delay lets the pointer cross onto the menu without it
      // closing, and a keyboard user inside the menu keeps it open.
      closeTimer = setTimeout(function () {
        if (!menu.querySelector(":focus-visible")) {
          menu.open = false;
        }
      }, 200);
    });

    // Hover has already opened it, so a mouse click must not shut it again.
    summary.addEventListener("click", function (event) {
      if (hoverAllowed(event)) {
        event.preventDefault();
        menu.open = true;
      }
    });

    menu.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.open) {
        event.stopPropagation();
        menu.open = false;
        summary.focus();
      }
    });

    menu.querySelectorAll(".mail-options a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.open = false;
      });
    });
  });

  document.addEventListener("click", function (event) {
    menus.forEach(function (menu) {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    });
  });
})();
