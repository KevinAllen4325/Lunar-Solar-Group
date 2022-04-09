document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const menu_icon = document.querySelector(".menu-icon");
    const menu_nav = document.querySelector(".site-menu");
    const cart_icon = document.querySelector(".cart-icon");
    const cart = document.querySelector(".site-cart");
    const cart_close = document.querySelector(".cart-back-icon");
    const cart_items = document.querySelector(".cart-items");
    const toggle_cart_open = document.querySelector("#toggleCartOpen");
    const add_to_cart = document.querySelectorAll(".call-to-action");
    

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

    //Add item to cart
    const addToCart = () => {
        const items = {id: 40762759512111,quantity: 1};

        fetch("/cart/add.js", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
        }).then(response => response.json())
        .catch(error => console.error('Unable to add to cart.', error));
    }
    
    const bindingFunction = (event) => {
        if (event.target.id === "counter-minus") {
            reduceCart();
        }
    }

    const reduceCart = () => {
        var items = {id: 40762759512111, quantity: 0};

        fetch("/cart/change.js", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
        }).then(response => console.log(response.json()))
        .catch(error => console.error('Unable to add to cart.', error));
    }

    const formattedPrice = (price) => {
        // Add decimal point before last two digits
        return price.substring(0,price.length-2)+"."+price.substring(price.length-2)
    }

    // get cart data
    const printCart = async () => {
        const response = await fetch('/cart.js')
        const cartJSON = response.json();
        return cartJSON;
    }
    
    // add cart data to page
    printCart().then(data => {
        const title = data.items[0].title;
        const quantity = data.items[0].quantity;
        const price = (data.items[0].price * quantity).toString();
        const image = data.items[0].image;

        cart_items.innerHTML = appendCart(title, quantity, price, image);
        cart_items.classList.remove("empty")
        cart_items.classList.add("item-added")
    });

    const appendCart = (title, quantity, price, image) => {
        return  `
        <div class="item-overview">
        <div class="product-overview">
            <div class="product-info">
                <div class="product-image">
                    <img
                        loading="eager"
                        src="${image}"
                        alt="High Rhode Product Image"
                        width="39"
                        height="78"
                    >
                </div>
                <p class="product-name h1">${title}</p>
                <p class="product-price">Single bottle, $39</p>
                <span class="clear-cart">X</span>
                <div class="product-counter">
                    <span id="counter-minus">-</span>
                    <span class="counter-number">${quantity}</span>
                    <span id="counter-plus">+</span>
                </div>
            </div>
        </div>
        <div class="sub-total">
            <p class="sub-total-text">Subtotal</p>
            <p class="sub-total-price">$${formattedPrice(price)}</p>
        </div>
    </div>
        `
    }
    
    const open = window.XMLHttpRequest.prototype.open;

function openReplacement() {
  this.addEventListener("load", function () {
    if (
      [
        "/cart/add.js",
        "/cart/update.js",
        "/cart/change.js",
        "/cart/clear.js",
      ].includes(this._url)
    ) {
      generate(this.response);
    }
  });
  return open.apply(this, arguments);
}

window.XMLHttpRequest.prototype.open = openReplacement;

    // event listeners
    cart.addEventListener("click", bindingFunction);
    menu_icon.addEventListener("click", menuOpacity);
    cart_close.addEventListener("click", cartClose);
    cart_icon.addEventListener("click", removeCartCheck);
    for (let i = 0; i < add_to_cart.length; i++) {
        add_to_cart[i].addEventListener("click", addToCart);
    }
});