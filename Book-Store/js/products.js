
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.add');
    buttons.forEach((button, index) => {
        const key = `favorite_${index}`;

        if (localStorage.getItem(key) === 'true') {
            button.classList.add('active');
            const icon = button.querySelector('i');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            button.childNodes[1].textContent = ' Added to Favorites';
        }

        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            const isActive = this.classList.contains('active');
            const key = `favorite_${index}`;

            if (isActive) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                this.childNodes[1].textContent = ' Added to Favorites';
                localStorage.setItem(key, 'true');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                this.childNodes[1].textContent = ' Add to Favorites';
                localStorage.removeItem(key);
            }
        });
    });
});

// function addToWishlist() {
//     // Retrieve book details
//     const book = {
//         title: document.querySelector('.off.title.style').textContent,
//         price: parseFloat(document.querySelector('.price').textContent.replace('Price: $', '').split(' ')[0]),
//         quantity: 1, // Assuming a default quantity, or you could adjust this if needed
//         subtotal: parseFloat(document.querySelector('.price').textContent.replace('Price: $', '').split(' ')[0]), // Same as price for a single item
//         image: document.querySelector('.main-product-image').getAttribute('src')
//     };

//     // Get existing wishlist data from localStorage
//     let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

//     // Check if the book is already in the wishlist
//     const isBookInWishlist = wishlist.some(item => item.title === book.title);

//     if (!isBookInWishlist) {
//         // Add new book to wishlist if not already present
//         wishlist.push(book);
//         localStorage.setItem('wishlist', JSON.stringify(wishlist));

//         // Update wishlist count if needed
//         addToWishlistCount();
//     } else {
//         console.log('Book is already in the wishlist');
//     }
//     console.log(wishlist);
// }





function sideNav() {
    const side = document.querySelector(".side");
    const sinav = document.querySelectorAll(".sinav");
    side.style.display = "block";
}

function close_nav() {
    const side = document.querySelector(".side");
    const sinav = document.querySelectorAll(".sinav");
    side.style.display = "none";
}


// function myFunction() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("search");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("searchList");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         if (filter && txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }

// myFunction();





function mySlide() {
    const slide = document.querySelector(".slide-right");
    const card1 = document.querySelector(".hidden-1");
    const card2 = document.querySelector(".hidden-2");
    const slideLeft = document.querySelector(".slide-left");
    slide.style.display = "none";
    card1.style.display = "none";
    card2.style.display = "block";
    slideLeft.style.display = "block";
}

function olive() {
    const slide = document.querySelector(".slide-right");
    const card1 = document.querySelector(".hidden-1");
    const card2 = document.querySelector(".hidden-2");
    const slideLeft = document.querySelector(".slide-left");
    slide.style.display = "block";
    card1.style.display = "block";
    card2.style.display = "none";
    slideLeft.style.display = "none";
}



function addToWishlist1(button) {
    // Find the nearest parent element with the class 'product-details' relative to the clicked button
    const productDetails = button.closest('.product-details');

    // Retrieve book details from the specific parent container
    const book = {
        title: productDetails.querySelector('h2').textContent.trim(), // Select h2 inside this container
        price: parseFloat(productDetails.querySelector('.current-price').textContent.replace('$', '').trim()), // Select price inside this container
        image: productDetails.querySelector('img').getAttribute('src') // Select image inside this container
    };

    // Get existing wishlist data from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if the book is already in the wishlist
    const bookIndex = wishlist.findIndex(item => item.title === book.title);

    if (bookIndex === -1) {
        // If the book is not in the wishlist, add it
        wishlist.push(book);
        console.log('Book added to wishlist:', book);
        button.innerHTML = '<i class="fa-solid fa-heart"></i> Remove from Favorite'; // Change button text/icon
    } else {
        // If the book is already in the wishlist, remove it
        wishlist.splice(bookIndex, 1); // Remove the book from the array
        console.log('Book removed from wishlist:', book);
        button.innerHTML = '<i class="fa-regular fa-heart"></i> Add To Favorite'; // Change button text/icon
    }

    // Save the updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update wishlist count
    addToWishlistCount();

    // Debug: Check the updated wishlist in localStorage
    console.log('Updated wishlist in localStorage:', JSON.parse(localStorage.getItem('wishlist')));
}

function addToWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCountElement = document.getElementById('wishlist-count');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlist.length;
    }
}


function addToWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCountElement = document.getElementById('wishlist-count');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlist.length;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Function to render the wishlist table
    function renderWishlistTable() {
        // Retrieve wishlist data from localStorage
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        // Select the table body element
        const wishlistTableBody = document.querySelector('#wishlist-table tbody');

        // Clear any existing rows
        wishlistTableBody.innerHTML = "";

        // Loop through the wishlist and generate table rows
        wishlist.forEach((book, index) => {
            // Create a new table row
            const row = document.createElement('tr');

            // Create table cells for each book detail
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;  // Book title

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${book.price.toFixed(2)}`;  // Book price

            const imageCell = document.createElement('td');
            const imgElement = document.createElement('img');
            imgElement.src = book.image;  // Book image URL
            imgElement.alt = book.title;  // Alt text
            imgElement.style.width = '50px';  // Adjust width if needed
            imageCell.appendChild(imgElement);

            // Create a remove button cell
            const removeCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-from-wishlist'); // Add a class for styling
            removeButton.addEventListener('click', function() {
                removeFromWishlist(index);  // Call remove function on click
            });
            removeCell.appendChild(removeButton);

            // Append cells to the row
            row.appendChild(imageCell);
            row.appendChild(titleCell);
            row.appendChild(priceCell);
            row.appendChild(removeCell);

            // Append the row to the table body
            wishlistTableBody.appendChild(row);
        });
    }

    // Function to remove an item from the wishlist
    function removeFromWishlist(index) {
        // Retrieve wishlist data from localStorage
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        // Remove the item at the specified index
        wishlist.splice(index, 1);

        // Save the updated wishlist back to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Re-render the table to reflect the changes
        renderWishlistTable();

        // Update wishlist count
        const wishlistCountElement = document.getElementById('wishlist-count');
        if (wishlistCountElement) {
            wishlistCountElement.textContent = wishlist.length;
        }
    }

    // Initial render of the wishlist table
    renderWishlistTable();
});
