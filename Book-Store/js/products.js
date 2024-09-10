
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

function addToWishlist() {
    // Retrieve book details
    const book = {
        title: document.querySelector('.off.title.style').textContent,
        price: parseFloat(document.querySelector('.price').textContent.replace('Price: $', '').split(' ')[0]),
        quantity: 1, // Assuming a default quantity, or you could adjust this if needed
        subtotal: parseFloat(document.querySelector('.price').textContent.replace('Price: $', '').split(' ')[0]), // Same as price for a single item
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

        // Update wishlist count if needed
        addToWishlistCount();
    } else {
        console.log('Book is already in the wishlist');
    }
    console.log(wishlist);
}





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
