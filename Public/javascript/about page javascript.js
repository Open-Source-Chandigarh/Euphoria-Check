// about-page-javascript.js

const sliderImages = document.querySelectorAll('.slider img');
const sliderDots = document.querySelectorAll('.slider-dot');

sliderDots.forEach((dot) => {
    dot.addEventListener('click', () => {
        const slideNumber = dot.getAttribute('data-slide');
        sliderImages.forEach((image) => {
            image.style.display = 'none';
        });
        document.getElementById(`slide-${slideNumber}`).style.display = 'block';

        sliderDots.forEach((dot) => {
            dot.classList.remove('active');
        });
        dot.classList.add('active');
    });
});

// Function to toggle the hamburger menu
function toggleMenu() {
    const menu = document.getElementById('hamburger-menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}
