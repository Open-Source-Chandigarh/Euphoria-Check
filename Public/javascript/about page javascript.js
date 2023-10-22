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