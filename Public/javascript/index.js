document.addEventListener('DOMContentLoaded', (event) => {
    const ctaCard = document.querySelector('.cta-card');
    const toggleButton = document.getElementById("theme-toggle");
    toggleButton.textContent = 'Toggle Dark Theme';
    
    toggleButton.addEventListener('click', () => {
        console.log("hello");
      ctaCard.classList.toggle('dark-theme');
    });
  });
  