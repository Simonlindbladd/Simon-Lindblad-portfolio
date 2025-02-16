document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.overlay-navbar a');

    // Toggle the menu on hamburger click
    hamburgerMenu.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Close the menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });
});



