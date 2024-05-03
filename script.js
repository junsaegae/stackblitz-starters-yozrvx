document.addEventListener('DOMContentLoaded', function () {
  const products = document.querySelectorAll('.add-to-cart');
  const cartItems = document.querySelector('.cart-items');
  const totalItems = document.getElementById('total-items');
  const totalPrice = document.getElementById('total-price');

  // Retrieve cart items from localStorage if available
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to render cart items
  function renderCart() {
    cartItems.innerHTML = '';
    let itemsCount = 0;
    let totalPriceValue = 0;

    cart.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price}</span>
        <span>${item.quantity}</span>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-from-cart" data-name="${
          item.name
        }">Remove</button>
      `;
      cartItems.appendChild(itemElement);

      itemsCount += item.quantity;
      totalPriceValue += item.price * item.quantity;
    });

    totalItems.textContent = itemsCount;
    totalPrice.textContent = totalPriceValue.toFixed(2);
  }

  // Add to cart
  products.forEach((product) => {
    product.addEventListener('click', function () {
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));

      // Check if item already exists in cart
      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      renderCart();
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });

  // Remove from cart
  cartItems.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-cart')) {
      const name = event.target.getAttribute('data-name');
      const itemIndex = cart.findIndex((item) => item.name === name);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        renderCart();
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  });

  // Initial cart rendering
  renderCart();
});
