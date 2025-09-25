document.addEventListener("DOMContentLoaded", function () {
  // Card reveal
  const card = document.getElementById("greetingCard");
  const cardInner = document.getElementById("cardInner");
  card.addEventListener("click", function () {
    cardInner.classList.toggle("show-message");
  });

  // Loading screen
  const loadingScreen = document.getElementById("loadingScreen");
  setTimeout(() => {
    loadingScreen.style.opacity = 0;
    setTimeout(() => (loadingScreen.style.display = "none"), 600);
  }, 1800);

  // Enhanced background music setup
  const backgroundMusic = document.getElementById("backgroundMusic");
  let musicStarted = false;
  let musicAttempts = 0;

  // Function to start music with multiple attempts
  function startMusic() {
    if (musicStarted || !backgroundMusic) return;

    musicAttempts++;
    // Remove all logs for production
    // Set volume to ensure it's not muted
    backgroundMusic.volume = 0.7;
    backgroundMusic.muted = false;

    backgroundMusic
      .play()
      .then(() => {
        musicStarted = true;
        // Show music indicator
        const musicIndicator = document.getElementById("musicIndicator");
        if (musicIndicator) {
          musicIndicator.style.display = "flex";
          setTimeout(() => {
            musicIndicator.style.opacity = "0";
            setTimeout(() => (musicIndicator.style.display = "none"), 500);
          }, 3000);
        }
        removeInteractionListeners();
      })
      .catch(() => {
        if (musicAttempts < 3) {
          setTimeout(startMusic, 500);
        }
      });
  }

  // Remove interaction listeners
  function removeInteractionListeners() {
    document.removeEventListener("click", handleFirstInteraction);
    document.removeEventListener("touchstart", handleFirstInteraction);
    document.removeEventListener("keydown", handleFirstInteraction);
    document.removeEventListener("mousemove", handleFirstInteraction);
    document.removeEventListener("scroll", handleFirstInteraction);
    window.removeEventListener("focus", handleFirstInteraction);
  }

  // Handle first user interaction
  function handleFirstInteraction() {
    if (!musicStarted) {
      startMusic();
    }
  }

  // Try multiple strategies to start music
  // Strategy 1: Try immediately
  setTimeout(startMusic, 100);

  // Strategy 2: Try after loading screen starts
  setTimeout(startMusic, 500);

  // Strategy 3: Try when loading screen is about to end
  setTimeout(startMusic, 1500);

  // Strategy 4: Listen for various user interactions
  document.addEventListener("click", handleFirstInteraction);
  document.addEventListener("touchstart", handleFirstInteraction);
  document.addEventListener("keydown", handleFirstInteraction);
  document.addEventListener("mousemove", handleFirstInteraction);
  document.addEventListener("scroll", handleFirstInteraction);
  window.addEventListener("focus", handleFirstInteraction);

  // Strategy 5: Try when page becomes visible
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && !musicStarted) {
      startMusic();
    }
  });

  // Navigation
  const navBtns = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".page");
  navBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const pageIndex = btn.getAttribute("data-page");
      pages.forEach((p, i) => {
        p.classList.toggle("active", i == pageIndex);
      });
    });
  });

  // Surprise cat gifts
  const catGiftImg = document.querySelector(".cat-gift-img");
  const surpriseContent = document.getElementById("surpriseContent");

  if (catGiftImg && surpriseContent) {
    catGiftImg.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      catGiftImg.classList.toggle("open");

      // Add a small delay for better user feedback
      if (catGiftImg.classList.contains("open")) {
      } else {
      }
    });

    // Make the cat image more obviously clickable
    catGiftImg.style.cursor = "pointer";
    catGiftImg.setAttribute("title", "Click me to reveal your surprise!");
  }
});
