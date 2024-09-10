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
// book_details.js

function addToCart() {
    // Retrieve book details
    const book = {
        title: document.querySelector('.product-details h2').textContent,
        price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
        quantity: parseInt(document.getElementById('quantity').value),
        image: document.querySelector('.main-product-image').getAttribute('src'),
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
}

function addToWishlist() {
    // Retrieve book details
    const book = {
        title: document.querySelector('.product-details h2').textContent,
        price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
        quantity: parseInt(document.getElementById('quantity').value),
        subtotal: parseFloat(document.querySelector('#total-price').textContent.replace('$', '')),
        image: document.querySelector('.main-product-image').getAttribute('src')
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
}




