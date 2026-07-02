const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
const totalSlides = slides.length;
let autoSlide;

/* Create dots */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => {
    goToSlide(i);
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});

/* Update carousel */
function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  document.querySelectorAll(".carousel-dots span").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

/* Controls */
function goToSlide(i) {
  index = i;
  updateCarousel();
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

/* Auto slide */
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000); // 3 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

/* Button events */
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});



/* Init */
updateCarousel();
startAutoSlide();
window.addEventListener("resize", updateCarousel);