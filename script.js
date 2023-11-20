// Variables globales pour l'index de la diapositive et l'intervalle
let slideIndex = 1;
let interval;

// Fonction pour afficher la diapositive initiale et démarrer le défilement automatique
function setInitialSlide() {
    showSlides(slideIndex);
    startAutoScroll();
}

// Fonction pour démarrer le défilement automatique
function startAutoScroll() {
    clearInterval(interval);
    interval = setInterval(() => plusSlides(1), 10000);
}

// Fonction pour changer les diapositives
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Fonction pour afficher une diapositive spécifique
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Fonction pour afficher les diapositives
function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let slide of slides) {
        slide.style.display = "none";
    }

    for (let dot of dots) {
        dot.className = dot.className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Gestionnaire d'événements pour le menu burger
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger-menu');
    const navUL = document.querySelector('nav ul');

    burger.addEventListener('click', () => navUL.classList.toggle('show'));

    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !navUL.contains(e.target)) {
            navUL.classList.remove('show');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => navUL.classList.remove('show'));
    });
});

// Gestionnaire d'événements pour le glissement tactile sur le diaporama
document.addEventListener('DOMContentLoaded', () => {
    let touchStartX = 0;
    let touchEndX = 0;
    const slider = document.querySelector('.slideshow-container');

    slider.addEventListener('touchstart', (e) => touchStartX = e.touches[0].clientX, false);
    slider.addEventListener('touchmove', (e) => touchEndX = e.touches[0].clientX, false);
    slider.addEventListener('touchend', () => {
        if (touchEndX < touchStartX - 50) plusSlides(1); // Glisser vers la gauche
        if (touchEndX > touchStartX + 50) plusSlides(-1); // Glisser vers la droite
    }, false);
});

// Initialiser le diaporama au chargement de la page
window.onload = setInitialSlide;
