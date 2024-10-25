
    // Initial stock for each item 
    let stock = {
        'peanut Butter': 10,
        'Honey': 10,
        'Cadbury': 10,
        'Gulab Jamun': 10,
        'Maggi': 10,
        'Tata Tea': 10,
        'Dettol': 10,
        'Oreo': 10,
        'Chips': 10
    };

    // Cart data
    let cart = {
        items: [],
        totalItems: 0,
        totalPrice: 0
    };

    // Function to add items to cart
    function addToCart(itemName, itemPrice) {
        // Check stock level
        if (stock[itemName] > 0) {
            // Deduct from stock
            stock[itemName]--;

            // Check if item already exists in cart
            const existingItem = cart.items.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.items.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            // Update total items and price
            cart.totalItems++;
            cart.totalPrice += itemPrice;

            updateCartDisplay();
            updateStockDisplay(itemName);

            // Check if stock is below 4 and alert
            if (stock[itemName] < 4) {
                alert(`${itemName} stock is running low. Consider purchasing more soon.`);
            }
        } else {
            alert(`${itemName} is out of stock!`);
        }
    }

    // Function to update cart display
    function updateCartDisplay() {
        const cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = ''; // Clear the cart list

        cart.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`;
            cartItemsElement.appendChild(listItem);
        });

        document.getElementById('total-items').textContent = cart.totalItems;
        document.getElementById('total-price').textContent = cart.totalPrice;
    }

    // Function to update stock display 
    function updateStockDisplay(itemName) {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const productTitle = card.querySelector('h3').textContent;
            if (productTitle === itemName) {
                const stockLabel = card.querySelector('.stock-label');
                if (stockLabel) {
                    stockLabel.textContent = `Stock: ${stock[itemName]}`;
                } else {
                    const newStockLabel = document.createElement('p');
                    newStockLabel.classList.add('stock-label');
                    newStockLabel.textContent = `Stock: ${stock[itemName]}`;
                    card.appendChild(newStockLabel);
                }
            }
        });
    }

    // Function to handle checkout
    function checkout() {
        if (cart.totalItems > 0) {
            alert(`Thank you for your purchase! Total: ₹${cart.totalPrice}`);
            // Clear cart after checkout
            cart.items = [];
            cart.totalItems = 0;
            cart.totalPrice = 0;
            updateCartDisplay();
        } else {
            alert('Your cart is empty!');
        }
    }

    