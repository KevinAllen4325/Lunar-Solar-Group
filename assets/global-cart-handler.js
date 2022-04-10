document.addEventListener("DOMContentLoaded", function() {
	// Variables
	const cart_items = document.querySelector(".cart-items");
	const add_to_cart = document.querySelectorAll(".call-to-action");
	const cart = document.querySelector(".site-cart");

	//Add item to cart
	const addToCart = () => {
		const items = {
			id: 40762759512111,
			quantity: 1
		};

		fetch("/cart/add.js", {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(items)
			}).then(response => response.json())
			.catch(error => console.error('Unable to add to cart.', error));
	}

	// Add decimal point before last two digits
	const formattedPrice = (price) => {
		return price.substring(0, price.length - 2) + "." + price.substring(price.length - 2);
	}

	// get cart data
	const printCart = async () => {
		const response = await fetch('/cart.js');
		const cartJSON = response.json();
		return cartJSON;
	}

	// add cart data to page
	printCart().then(data => {
		if (data.items.length !== 0) {
			const title = data.items[0].title;
			const quantity = data.items[0].quantity;
			const price = data.items[0].price;
			const image = data.items[0].image;

			appendCart(title, quantity, price, image);
		} else {
			return
		}
	});

	// append cart data to page
	const appendCart = (title, quantity, price, image) => {
		const newPrice = (price * quantity).toString();
		cart_items.innerHTML = `
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
                        <div class="product-counter">
                            <span id="counter-minus" class="pointer">-</span>
                            <span class="counter-number">${quantity}</span>
                            <span id="counter-plus" class="pointer">+</span>
                        </div>
                    </div>
                    <a href="#" id="clear-cart">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2.315L20.27 20.585" stroke="#272727" stroke-width="2" stroke-linecap="square"/>
                            <path d="M20.27 2.315L2.00002 20.585" stroke="#272727" stroke-width="2" stroke-linecap="square"/>
                        </svg>
                            
                    </a>
                    
                </div>
                <div class="sub-total">
                    <p class="sub-total-text">Subtotal</p>
                    <p class="sub-total-price">$${formattedPrice(newPrice)}</p>
                </div>
            </div>
                `
		addedCartMessage();
		document.querySelector("#counter-minus").addEventListener("click", decrementCart);
		document.querySelector("#counter-plus").addEventListener("click", incrementCart);
	}

	const decrementCart = async () => {
		printCart().then(data => {
			const quantity = data.items[0].quantity;
			const items = {
				"id": "40762759512111",
				"quantity": `${quantity - 1}`
			};

			fetch('/cart/change.js', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(items),
			});
		});
	}

	const incrementCart = async () => {
		printCart().then(data => {
			const quantity = data.items[0].quantity;
			const items = {
				"id": "40762759512111",
				"quantity": `${quantity + 1}`
			};

			fetch('/cart/change.js', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(items),
			});
		});
	}

	const addedCartMessage = () => {
		document.querySelector("#clear-cart").addEventListener("click", clearCart);
		cart_items.classList.remove("empty");
		cart_items.classList.add("item-added");
	}

	const emptyCartMessage = () => {
		cart_items.classList.add("empty");
		cart_items.classList.remove("item-added");
		cart_items.innerHTML = `<p class="empty-text h1">Your cart is thirsty.</p>`;
	}

	//Removes all items from cart
	const clearCart = () => {
		fetch("/cart/clear.js", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	// look for events and update cart without reloading page
	(function(ns, fetch) {
		if (typeof fetch !== 'function') return;

		ns.fetch = function() {
			const response = fetch.apply(this, arguments);
			response.then(res => {
				if ([
						`${window.location.origin}/cart/add.js`,
						`${window.location.origin}/cart/update.js`,
						`${window.location.origin}/cart/clear.js`,
					].includes(res.url)) {
					res.clone().json().then(data => {
						if (data.title) {
							appendCart(data.title, data.quantity, data.price, data.image);
						} else {
							emptyCartMessage();
						}
					});
				}
				if ([
						`${window.location.origin}/cart/change.js`
					].includes(res.url)) {
					res.clone().json().then(data => {
						if (data.items.length !== 0) {
							document.querySelector(".counter-number").innerHTML = data.items[0].quantity;
						} else {
							emptyCartMessage();
						}
					});
				}
			});
			return response;
		}
	}(window, window.fetch))

	const checkMenuEvent = () => {
		document.querySelector("#toggleCartOpen").checked = true;
		cart.classList.remove("closed");
	}

	//Event Listeners
	for (let i = 0; i < add_to_cart.length; i++) {
		add_to_cart[i].addEventListener("click", addToCart);
		add_to_cart[i].addEventListener("click", checkMenuEvent);
	}
});