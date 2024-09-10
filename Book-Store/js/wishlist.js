// Function to populate the wishlist table
function populateWishlistTable() {
  const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
  const tableBody = document.querySelector('.table tbody');

  tableBody.innerHTML = '';

  wishlistItems.forEach((item, index) => {
    console.log(item); // Debug to see if item exists
    const row = document.createElement('tr');

    row.innerHTML = `
      <td data-label="Image"><img src="${item.image}" alt="${item.title}" style="width: 50px;"></td>
      <td data-label="Name">${item.title}</td>
      <td data-label="Price">$${item.price.toFixed(2)}</td>
      <td data-label="Availability">In Stock</td>
      <td data-label="Add to Cart"><button onclick="moveToCart(${index})">Add to Cart</button></td>
      <td data-label="Remove"><button class="remove-item" data-index="${index}" onclick="removeWishlistItem(${index})"><i class="fa-solid fa-trash"></i></button></td>
    `;

    tableBody.appendChild(row);
  });

  updateWishlistCount(); // Update the item count (distinct items)
}


function updateWishlistCount() {
  const wishlistItem = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCount = wishlistItem.length; // Number of distinct items
  localStorage.setItem('wishlistCount', wishlistCount);
  updateWishlistCountDisplay(); // Update the display
}

function moveToCart(index) {
  // Get wishlist data from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Find the item to move by index
  const item = wishlist[index];

  // Get existing cart data from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item is already in the cart
  const existingItem = cart.find(cartItem => cartItem.title === item.title);

  if (existingItem) {
    // If the item is already in the cart, update the quantity and subtotal
    existingItem.quantity += item.quantity;
    existingItem.subtotal = existingItem.price * existingItem.quantity;
  } else {
    // Set default quantity and subtotal if not present in wishlist
    const quantity = item.quantity || 1;
    const subtotal = item.subtotal || item.price * quantity;

    // Create new cart item with quantity and subtotal
    const cartItem = {
      ...item,
      quantity: quantity,
      subtotal: subtotal
    };

    cart.push(cartItem); // Add item to cart
  }

  // Save updated cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Optionally, remove the item from the wishlist (if you want to remove it)
  

  // Refresh displays
  updateCartCountDisplay();
  populateCartTable();
  populateWishlistTable(); // Refresh the wishlist table
}


function removeWishlistItem(index) {
  // Get wishlist data from localStorage
  let wishlistItem = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Remove the item by index
  wishlistItem.splice(index, 1); // Remove item at the specified index

  // Save updated wishlist data to localStorage
  localStorage.setItem('wishlist', JSON.stringify(wishlistItem));
  populateWishlistTable(); // Refresh the table

  // Refresh the wishlist page

}
// Function to clear the cart
function clearWishlistCart() {
  localStorage.removeItem('wishlist'); // Clear the cart from localStorage
  updateWishlistCount(); // Reset cart count to 0
  populateWishlistTable(); // Refresh the cart table
}
// Event listener for the Clear Cart button
document.querySelector('.clear-cart').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default action
  clearWishlistCart(); // Call the clearCart function
});

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  populateWishlistTable();

  // Event delegation for remove buttons
  document.querySelector('.table tbody').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.getAttribute('data-index');
      removeWishlistItem(index);
    }
  });

  updateWishlistCountDisplay(); // Display the initial cart count
});