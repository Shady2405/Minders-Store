function show(){
    const bar = document.querySelector(".navMob");
    bar.style.display = "flex";
}
function hide(){
    const bar = document.querySelector(".navMob");
    bar.style.display = "none";
}

function drop() {
    const drop = document.querySelector(".dropdown");
    const element = document.getElementById("DOWN");

    if (drop.style.display === "none") {
        drop.style.display = "flex";
        element.classList.remove("fa-caret-down");
        element.classList.add("fa-caret-up");
    } else {
        drop.style.display = "none";
        element.classList.remove("fa-caret-up");
        element.classList.add("fa-caret-down");
    }
}
function dr() {
    const drop = document.querySelector(".dropDown");
    const element = document.getElementById("M");

    if (drop.style.display === "none") {
        drop.style.display = "flex";
        element.classList.remove("fa-caret-down");
        element.classList.add("fa-caret-up");
    } else {
        drop.style.display = "none";
        element.classList.remove("fa-caret-up");
        element.classList.add("fa-caret-down");
    }
}
function search() {
    const search = document.getElementById("input");
    const field = document.getElementById("feild")
    search.style.display = "none";
    field.classList.add("animition")
    field.style.display = "block"

}
function sea(){
    const x = document.querySelector(".xx");
    const search = document.getElementById("icon");
    const field = document.getElementById("F")
    search.style.display = "none";
    field.classList.add("animition")
    field.style.display = "block"
    x.classList.add("show")
}
function xmark(){
    const search = document.getElementById("input");
    const field = document.getElementById("feild");
    field.style.display = "none";
    search.style.display = "block";
}
function xxmark(){
    const x = document.querySelector(".xx");
    const search = document.getElementById("icon");
    const field = document.getElementById("F");
    field.style.display = "none";
    x.style.display = "none";
    x.classList.remove("show")
    search.style.display = "block";
}
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    if (isLoggedIn) {
        document.getElementById('login-link').style.display = 'none';
        const pIcon = document.getElementById('p-icon');
        pIcon.style.display = 'flex'; // Show the icon and username
        console.log('isLoggedIn:', isLoggedIn); // Should be true or false
    console.log('username:', username); // Should be the username or null
        
        const usernameDisplay = document.getElementById('username-display');
        usernameDisplay.textContent = `Hello, ${username}`;

    } else {
        document.getElementById('login-link').style.display = 'block';
        document.getElementById('p-icon').style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    if (isLoggedIn) {
        document.getElementById('logmob').style.display = 'none';
        const pIcon = document.getElementById('pp-icon');
        pIcon.style.display = 'flex'; // Show the icon and username
        console.log('isLoggedIn:', isLoggedIn); // Should be true or false
    console.log('username:', username); // Should be the username or null
        
        const usernameDisplay = document.getElementById('uusername-display');
        usernameDisplay.textContent = `Hello, ${username}`;

    } else {
        document.getElementById('logmob').style.display = 'block';
        document.getElementById('pp-icon').style.display = 'none';
    }
});