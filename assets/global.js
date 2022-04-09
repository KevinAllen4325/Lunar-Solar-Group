document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const menu_icon = document.querySelector(".menu-icon");
    const menu_nav = document.querySelector(".site-menu");
    const cart_icon = document.querySelector(".cart-icon");
    const cart = document.querySelector(".site-cart");
    const cart_close = document.querySelector(".cart-back-icon");
    const toggle_cart_open = document.querySelector("#toggleCartOpen");
    const add_to_cart = document.querySelectorAll(".call-to-action");
    const product_data = {
        items: [
            {
             id: 6968768102447,
             quantity: 1
            }
          ]
    }

    // Functions
    const menuOpacity = () => {
        if (menu_nav.classList.contains("closed")) {
            menu_nav.classList.remove("closed");
        } else {
            setTimeout(() => {
                menu_nav.classList.add("closed");
            }, 200);
        }
    }

    const cartClose = () => {
        toggle_cart_open.checked = false;
        setTimeout(() => {
            cart.classList.add("closed");
        }, 200);
    }

    const removeCartCheck = () => {
        if (cart.classList.contains("closed")) {
            cart.classList.remove("closed");
        }
    }

    const addToCart = (event) => {
        axios.post("/cart.js", product_data);
    }
    
    // event listeners
    menu_icon.addEventListener("click", menuOpacity);
    cart_close.addEventListener("click", cartClose);
    cart_icon.addEventListener("click", removeCartCheck);

    for (let i = 0; i < add_to_cart.length; i++) {
        add_to_cart[i].addEventListener("click", addToCart);
    }


    axios.get('/en/cart.js').then(function (response) {
        // handle success
        const cartJSON = response;
        console.log(cartJSON);
        const title = cartJSON[0].title;
        const price = cartJSON[0].variants[0].price;
        const image = cartJSON[0].images[0].src;
      })
})