let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

function showSlide(index) {

    slides.forEach(slide => {

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");
}

setInterval(() => {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}, 3000);