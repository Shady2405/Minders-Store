// Function to populate the wishlist table
function populateWishlistTable() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const tableBody = document.querySelector('.table tbody');

  tableBody.innerHTML = ''; // Clear the table before repopulating

  wishlistItems.forEach((item, index) => {
    console.log(item); // Debug to see if item exists
    const row = document.createElement('tr');

    row.innerHTML = `
      <td data-label="Image"><img src="${item.image}" alt="${item.title}" style="width: 50px;"></td>
      <td data-label="Name">${item.title}</td>
      <td data-label="Price">$${item.price.toFixed(2)}</td>
      <td data-label="Availability">In Stock</td>
      <td data-label="Add to Cart"><button class="move-to-cart" data-index="${index}">Add to Cart</button></td>
      <td data-label="Remove"><button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button></td>
    `;

    tableBody.appendChild(row);
  });

  updateWishlistCount(); // Update the item count (distinct items)
}

// Function to update the wishlist count display
function updateWishlistCount() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCount = wishlistItems.length; // Number of distinct items
  localStorage.setItem('wishlistCount', wishlistCount);
  updateWishlistCountDisplay(); // Update the display
}

// Function to move an item from wishlist to cart
function moveToCart(index) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const item = wishlist[index];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(cartItem => cartItem.title === item.title);

  if (existingItem) {
    // If the item is already in the cart, update the quantity and subtotal
    existingItem.quantity += 1; // Increase quantity by 1
    existingItem.subtotal = existingItem.price * existingItem.quantity;
  } else {
    // Create a new cart item with a default quantity of 1
    const cartItem = { ...item, quantity: 1, subtotal: item.price };
    cart.push(cartItem); // Add item to cart
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Optionally, remove the item from the wishlist after adding to cart
  

  // Refresh displays
  updateCartCountDisplay();
  populateCartTable();
  populateWishlistTable();
}

// Function to remove an item from the wishlist
function removeWishlistItem(index) {
  let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (index < 0 || index >= wishlistItems.length) {
    console.error("Invalid index");
    return;
  }

  wishlistItems.splice(index, 1); // Remove the item at the specified index
  localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

  populateWishlistTable(); // Refresh the table
  updateWishlistCount(); // Optionally, update the wishlist count
}

// Function to clear the entire wishlist
function clearWishlist() {
  localStorage.removeItem('wishlist'); // Clear wishlist from localStorage
  populateWishlistTable(); // Refresh the table
  updateWishlistCount(); // Reset wishlist count to 0
}

// Event listeners for Clear Wishlist button
document.querySelector('.clear-cart').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default action
  clearWishlist(); // Call clearWishlist function
});

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  populateWishlistTable();

  // Event delegation for Remove buttons
  document.querySelector('.table tbody').addEventListener('click', function (e) {
    if (e.target.closest('.remove-item')) {
      const index = e.target.closest('.remove-item').getAttribute('data-index');
      removeWishlistItem(index);
    }

    if (e.target.closest('.move-to-cart')) {
      const index = e.target.closest('.move-to-cart').getAttribute('data-index');
      moveToCart(index);
    }
  });

  updateWishlistCountDisplay(); // Display the initial wishlist count
});