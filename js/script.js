const progressBar = document.getElementById("progressBar");
const hero = document.getElementById("hero");
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const searchBtn = document.getElementById("searchBtn");
const cards = document.querySelectorAll(".card");
const closeBtn = document.querySelector(".close-btn");
const modal = document.getElementById("destinationModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const detailsButtons = document.querySelectorAll(".details-btn");
const bookButtons = document.querySelectorAll(".book-tour-btn");
const toggleBtn = document.querySelector(".toggle-btn");

const backgrounds = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
];

let current = 0;

window.addEventListener("scroll", () => {
  if (!progressBar) return;

  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + "%";
});

const changeBackground = () => {
  if (!hero) return;

  hero.style.backgroundImage = `url(${backgrounds[current]})`;
  current++;

  if (current >= backgrounds.length) {
    current = 0;
  }
};

changeBackground();
setInterval(changeBackground, 3000);

const cities = [
  "Maldives",
  "Paris",
  "Switzerland",
  "Turkey",
  "Dubai",
  "London",
  "Bali",
  "Italy"
];

const createPopup = (message, color) => {
  const popup = document.createElement("div");
  popup.textContent = message;

  Object.assign(popup.style, {
    position: "fixed",
    top: "30px",
    right: "30px",
    padding: "18px 25px",
    background: color,
    color: "white",
    borderRadius: "12px",
    zIndex: "99999",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    animation: "popupAnim 0.5s ease"
  });

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 3000);
};

searchInput?.addEventListener("keyup", (e) => {
  suggestions.innerHTML = "";

  const value = e.target.value.toLowerCase();
  if (!value) return;

  const filtered = cities.filter(city =>
    city.toLowerCase().includes(value)
  );

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = `No destination found for "${value}"`;
    li.style.color = "red";
    suggestions.appendChild(li);
    return;
  }

  filtered.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;

    li.addEventListener("click", () => {
      searchInput.value = city;
      suggestions.innerHTML = "";
    });

    suggestions.appendChild(li);
  });
});

searchBtn?.addEventListener("click", () => {
  const value = searchInput.value.toLowerCase();
  let found = false;

  cards.forEach(card => {
    const city = card.dataset.city.toLowerCase();

    if (city.includes(value)) {
      found = true;
      card.style.display = "block";
      card.scrollIntoView({ behavior: "smooth" });
      card.style.animation = "pulse 1s";
    } else {
      card.style.display = "none";
    }
  });

  if (!found) {
    createPopup(
      "Destination not available. Redirecting to custom booking!",
      "#ef4444"
    );

    setTimeout(() => {
      window.location.href =
        "booking.html?destination=" + encodeURIComponent(searchInput.value);
    }, 2000);
  } else {
    createPopup("Destination Found Successfully!", "#22c55e");
  }
});

detailsButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const city = card.dataset.city;

    modal.style.display = "flex";
    modalTitle.textContent = city;
    modalText.textContent =
      `${city} offers luxury hotels, adventures, beautiful views, and unforgettable experiences.`;
  });
});

closeBtn?.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

bookButtons.forEach(button => {
  button.addEventListener("click", () => {
    const city = modalTitle.textContent;
    localStorage.setItem("selectedDestination", city);
    window.location.href = "booking.html";
  });
});

toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});