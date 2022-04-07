document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const menu_icon = document.querySelector(".menu-icon");
    const menu_nav = document.querySelector(".site-menu");


    // Functions
    const toggleMenu = () => {
        menu_nav.classList.toggle("active");
        menu_icon.classList.toggle("active");
        if(menu_nav.classList.contains("closed")) {
            menu_nav.classList.remove("closed");
        } else {
            setTimeout(() => {
                menu_nav.classList.add("closed");
            }, 200);
        }
    }

    // Open and close menu
    menu_icon.addEventListener("click", toggleMenu);
})