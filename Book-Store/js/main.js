// Ensure the count is updated when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
  updateCartCountDisplay();
  updateWishlistCountDisplay();
});

document.addEventListener('DOMContentLoaded', function () {
  const mainImage = document.getElementById('main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  let originalSrc = mainImage.src;

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseover', function () {
      mainImage.src = this.dataset.src;
    });

    thumbnail.addEventListener('mouseout', function () {
      mainImage.src = originalSrc;
    });

    thumbnail.addEventListener('click', function () {
      originalSrc = this.dataset.src;
      mainImage.src = originalSrc;
    });
  });

  const decreaseBtn = document.querySelector('.decrease');
  const increaseBtn = document.querySelector('.increase');
  const quantityInput = document.getElementById('quantity');
  const totalPriceElement = document.getElementById('total-price');
  const unitPrice = 15.00;

  function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value);
    const totalPrice = (unitPrice * quantity).toFixed(2);
    totalPriceElement.textContent = totalPrice;
  }

  decreaseBtn.addEventListener('click', function () {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
      updateTotalPrice();
    }
  });

  increaseBtn.addEventListener('click', function () {
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    updateTotalPrice();
  });

  quantityInput.addEventListener('input', function () {
    if (quantityInput.value < 1) {
      quantityInput.value = 1;
    }
    updateTotalPrice();
  });

});

//retrive books
function addToCart() {
  // Retrieve book details
  const book = {
    title: document.querySelector('.product-details h2').textContent,
    price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
    quantity: parseInt(document.getElementById('quantity').value),
    image: document.querySelector('.main-product-image').getAttribute('alt'),
    subtotal: parseFloat(document.querySelector('#total-price').textContent.replace('$', ''))
  };

  // Get existing cart data from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the book is already in the cart
  const existingItem = cart.find(cartItem => cartItem.title === book.title);

  if (existingItem) {
    // If the item is already in the cart, update the quantity and subtotal
    existingItem.quantity += book.quantity;
    existingItem.subtotal = existingItem.price * existingItem.quantity;
  } else {
    // Add new book to cart with quantity and subtotal
    cart.push(book);
  }

  // Save updated cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count and total
  addToCartCount();
  updateCartTotal();
  console.log(cart)
}

function addToWishlist() {
  // Retrieve book details
  const book = {
    title: document.querySelector('.product-details h2').textContent,
    price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
    quantity: parseInt(document.getElementById('quantity').value),
    subtotal: parseFloat(document.querySelector('#total-price').textContent.replace('$', '')),
    image: document.querySelector('.main-product-image').getAttribute('alt')
  };

  // Get existing wishlist data from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the book is already in the wishlist
  const isBookInWishlist = wishlist.some(item => item.title === book.title);

  if (!isBookInWishlist) {
    // Add new book to wishlist if not already present
    wishlist.push(book);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update wishlist count
    addToWishlistCount();
  } else {
    console.log('Book is already in the wishlist');
  }
  console.log(wishlist)
}

// This function will update the cart count on any page
function updateCartCountDisplay() {
  const cartCountElement = document.getElementById('cart-count');
  let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// This function will decrease the cart count and store it in localStorage
function removeFromCart() {
  let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
  if (cartCount > 0) {
    cartCount--;
    localStorage.setItem('cartCount', cartCount);
    updateCartCountDisplay();
  }
}

// This function will update the wishlist count on any page
function updateWishlistCountDisplay() {
  const wishlistCountElement = document.getElementById('wishlist-count');
  let wishlistCount = localStorage.getItem('wishlistCount') ? parseInt(localStorage.getItem('wishlistCount')) : 0;
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlistCount;
  }
}


// This function will decrease the wishlist count and store it in localStorage
function removeFromWishlist() {
  let wishlistCount = localStorage.getItem('wishlistCount') ? parseInt(localStorage.getItem('wishlistCount')) : 0;
  if (wishlistCount > 0) {
    wishlistCount--;
    localStorage.setItem('wishlistCount', wishlistCount);
    updateWishlistCountDisplay();
  }
}

// This function will reset the wishlist count and update the display

function addToCartCount() {
  // Get existing cart data from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cartItems.length; // Count distinct items in the cart

  // Update cart count in localStorage and UI
  localStorage.setItem('cartCount', cartCount);
  updateCartCountDisplay();
  console.log(cart);
}

function addToWishlistCount() {
  // Get existing wishlist data from localStorage
  let wishlistItem = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCount = wishlistItem.length;

  // Update wishlist count in localStorage and UI
  localStorage.setItem('wishlistCount', wishlistCount);
  updateWishlistCountDisplay();
}
// Call this function on page load to ensure the count is synced
// function resetCart() {
//   localStorage.setItem('cartCount', 0); // Set cart count to 0 in localStorage
//   updateCartCountDisplay(); // Update the display to reflect the reset count
//   localStorage.setItem('wishlistCount', 0); // Set cart count to 0 in localStorage
//   updateWishlistCountDisplay(); // Update the display to reflect the reset count
// }

document.getElementById('submit-order').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Validate the form (if validation is done here or you can keep validation in a separate function)
  if (validateCheckoutForm()) {
    // Show an alert message
    alert('Your order has been submitted!');

    // Clear the cart
    clearCart();
    // Update the total price to $0.00
    updateTotalPrice();
    // Update the cart count to 0
    updateCartCount();
  }
});

function clearCart() {
  // Clear the localStorage or sessionStorage for the cart
  localStorage.removeItem('cartItems');

  const cartItemsContainer = document.querySelector('.cart-items-container');
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = 'Your Cart Is Empty';
  }
}

function updateTotalPrice() {
  const totalPriceElement = document.getElementById('cart-total');
  totalPriceElement.textContent = '$0.00'; // Reset the total price to 0
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = '0'; // Reset the cart count to 0
}




