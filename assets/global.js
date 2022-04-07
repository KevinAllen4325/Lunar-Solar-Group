document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const menu_icon = document.querySelector(".menu-icon");
    const menu_nav = document.querySelector(".site-menu");


    // Functions
    const toggleMenu = () => {
        menu_nav.classList.toggle("active");
    }

    // Open and close menu
    menu_icon.addEventListener("click", toggleMenu);
    

})