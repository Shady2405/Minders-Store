// Function to populate the cart table
function populateCartTable() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const tableBody = document.querySelector('.table tbody');

  tableBody.innerHTML = '';

  cartItems.forEach((item, index) => {
    console.log(item);
    const row = document.createElement('tr');

    row.innerHTML = `
      <td data-label="Image"><img src="${item.image}" alt="${item.title}" width="50"></td>
      <td data-label="Name">${item.title}</td>
      <td data-label="Price">$${item.price.toFixed(2)}</td>
      <td data-label="Quantity"><span class="quantity-text">${item.quantity}</span></td>
      <td data-label="Subtotal">$${item.subtotal}</td>
      <td data-label="Remove"><button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button></td>
    `;

    tableBody.appendChild(row);
  });

  updateCartTotal();
  updateCartCount(); // Update the item count (distinct items)
}


// Function to update the cart total price
function updateCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0).toFixed(2);
  document.getElementById('cart-total').textContent = `$${total}`;
}

// Function to update the cart count (distinct items)
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cartItems.length; // Number of distinct items
  localStorage.setItem('cartCount', cartCount);
  updateCartCountDisplay(); // Update the display
}

// Function to handle removal of cart items
function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1); // Remove item at the specified index
  localStorage.setItem('cart', JSON.stringify(cartItems));

  populateCartTable(); // Refresh the table
  updateCartTotal(); // Update cart total
}

// Function to clear the cart
function clearCart() {
  localStorage.removeItem('cart'); // Clear the cart from localStorage
  updateCartTotal(); // Reset the total price to $0
  updateCartCount(); // Reset cart count to 0
  populateCartTable(); // Refresh the cart table
}

// Event listener for the Clear Cart button
document.querySelector('.clear-cart').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default action
  clearCart(); // Call the clearCart function
});

// Function to handle the 'Update Cart' action (if necessary)
document.querySelector('.update-cart').addEventListener('click', function (e) {
  e.preventDefault();
  populateCartTable(); // Update cart table with current values
  updateCartTotal(); // Update total price
});

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  populateCartTable();

  // Event delegation for remove buttons
  document.querySelector('.table tbody').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.getAttribute('data-index');
      removeCartItem(index);
    }
  });

  updateCartCountDisplay(); // Display the initial cart count
});
// Add event listener to submit button
document.getElementById('submit-order').addEventListener('click', validateCheckoutForm);
// Function to validate form fields
function validateCheckoutForm(event) {
  event.preventDefault(); // Prevent form submission for validation
  let isValid = true;
  let errorMessage = "";

  // Full Name validation
  const fname = document.getElementById('fname').value.trim();
  if (fname === "") {
    errorMessage += "Full Name is required.\n";
    isValid = false;
  }

  // Email validation
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email === "" || !email.match(emailPattern)) {
    errorMessage += "Please enter a valid email address.\n";
    isValid = false;
  }

  // Address validation
  const address = document.getElementById('Address').value.trim();
  if (address === "") {
    errorMessage += "Address is required.\n";
    isValid = false;
  }

  // City validation
  const city = document.getElementById('city').value.trim();
  if (city === "") {
    errorMessage += "City is required.\n";
    isValid = false;
  }

  // State validation
  const state = document.getElementById('state').value.trim();
  if (state === "") {
    errorMessage += "State is required.\n";
    isValid = false;
  }

  // Zip validation
  const zip = document.getElementById('zip').value.trim();
  if (zip === "" || isNaN(zip)) {
    errorMessage += "Please enter a valid Zip code.\n";
    isValid = false;
  }

  // Credit Card Name validation
  const cardName = document.getElementById('cardname').value.trim();
  if (cardName === "") {
    errorMessage += "Name on Card is required.\n";
    isValid = false;
  }

  // Credit Card Number validation
  const cardNumber = document.getElementById('cardnumber').value.trim();
  const cardPattern = /^\d{16}$/;
  if (cardNumber === "" || !cardNumber.match(cardPattern)) {
    errorMessage += "Please enter a valid 16-digit credit card number.\n";
    isValid = false;
  }

  // Expiry Month validation
  const expMonth = document.getElementById('expmonth').value.trim();
  if (expMonth === "") {
    errorMessage += "Expiry Month is required.\n";
    isValid = false;
  }

  // Expiry Year validation
  const expYear = document.getElementById('exp').value.trim();
  if (expYear === "" || isNaN(expYear) || expYear.length !== 4) {
    errorMessage += "Please enter a valid Expiry Year (e.g., 2026).\n";
    isValid = false;
  }

  // CVV validation
  const cvv = document.getElementById('cvv').value.trim();
  const cvvPattern = /^\d{3}$/;
  if (cvv === "" || !cvv.match(cvvPattern)) {
    errorMessage += "Please enter a valid 3-digit CVV.\n";
    isValid = false;
  }

  // Display error messages or submit the form
  if (!isValid) {
    alert(errorMessage); // Display errors in an alert box
  } else {
    alert("Order submitted successfully!");
    document.querySelector('form').submit(); // If valid, submit the form
  }
}


