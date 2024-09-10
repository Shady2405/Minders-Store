document.querySelector("form"); 

function login(event) {
    event.preventDefault(); // Prevent the default form submission
    var enteredname = document.getElementById("enteredname").value;
    var enteredpass = document.getElementById("enteredpass").value;
    var storedname = localStorage.getItem("username");
    var storedpass = localStorage.getItem("password");
    if (enteredname === storedname && enteredpass === storedpass) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = 'index.html';
    } else {
        alert("Invalid username or password! or you are not signed up");
    }
}
 
        
        /*====================================*/
        function icons(){
           alert(" signup successful!"); 
        }

        function isPassEqualConfirmPass() {
            let password = document.getElementById("entered-pass").value;
            let confirmpass = document.getElementById("confirm-pass").value;
            if (password != confirmpass || confirmpass=="") {
                alert("Password and confirm password arent equal!");
            }
            else {
                alert(" signup successful!");
                setUsernameAndPass();
            } 
        }
        function isValidPassword(password) {
            const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (password.match(passwordPattern)) return true;
            else return false;
            
        }
        function isAlphanumeric(username) {
            const namePattern = /^(?=.*[a-z])/
           
            if (username.match(namePattern)){
                
                return true;
            } 
            else return false;
        }
        function isValidEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (email.match(emailPattern)){
                
                return true;
            } 
            else return false;
        }

        function CheckPassLengthValid() {
            let username = document.getElementById("entered-name").value;
            if (!isAlphanumeric(username) || (username.length<3 ||username.length>15  )) {
                alert("Username must be alphanumeric and 3-15 characters long.");
                return;
            }
            let email = document.getElementById("entered-email").value;

            if (!isValidEmail(email)) {
                alert("Please enter a valid email.");
                return;
            }
        
            let password = document.getElementById("entered-pass").value;
            let passwordLength = password.length;
            if (!isValidPassword(password)) {
                alert("Password must be at least 8 characters long, include at least one number and one special character.");
                return;
            }
            else {
                isPassEqualConfirmPass();
            }
            
        }
        function setUsernameAndPass(){
            var username = document.getElementById("entered-name").value;
            var password = document.getElementById("entered-pass").value;
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        }