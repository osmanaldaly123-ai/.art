// =========== وضع ليلي/صباحي ===========
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// =========== سلايدر الصور ===========
let slideIndex = 0;
const slides = document.querySelector(".slides");

function showSlide(index) {
  if (!slides) return;
  const totalSlides = slides.children.length;
  if (index >= totalSlides) slideIndex = 0;
  if (index < 0) slideIndex = totalSlides - 1;
  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

document.getElementById("nextBtn")?.addEventListener("click", () => {
  slideIndex++;
  showSlide(slideIndex);
});

document.getElementById("prevBtn")?.addEventListener("click", () => {
  slideIndex--;
  showSlide(slideIndex);
});

// تشغيل تلقائي كل 5 ثواني
setInterval(() => {
  slideIndex++;
  showSlide(slideIndex);
}, 5000);

// =========== تحميل الصور من images.json ===========
async function loadImages() {
  try {
    const response = await fetch("images.json");
    const images = await response.json();

    const slidesContainer = document.getElementById("slidesContainer");
    slidesContainer.innerHTML = ""; // تفريغ القديم

    images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      slidesContainer.appendChild(img);
    });

    slideIndex = 0;
    showSlide(slideIndex);
  } catch (error) {
    console.error("خطأ في تحميل الصور:", error);
  }
}

loadImages();
