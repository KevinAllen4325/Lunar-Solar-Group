document.addEventListener("DOMContentLoaded", function() {
	// Variables
	const menu_icon = document.querySelector(".menu-icon");
	const menu_nav = document.querySelector(".site-menu");
	const cart_icon = document.querySelector(".cart-icon");
	const cart = document.querySelector(".site-cart");
	const cart_close = document.querySelector(".cart-back-icon");
	const toggle_cart_open = document.querySelector("#toggleCartOpen");

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

	// event listeners
	menu_icon.addEventListener("click", menuOpacity);
	cart_close.addEventListener("click", cartClose);
	cart_icon.addEventListener("click", removeCartCheck);
});