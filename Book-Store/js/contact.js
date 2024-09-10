document.forms[0].onsubmit = function (validate) {
    const name = document.getElementById("First_Name").value;
    const lastname = document.getElementById("Last_Name").value;
    const email = document.getElementById("Email").value;
    const message = document.getElementById("Message").value;
    const subject = document.getElementById("Additional").value;
    
    const nameError = document.getElementById(
        "name-error"
    );
    const emailError = document.getElementById(
        "email-error"
    );
    const lastnameError = document.getElementById(
        "lastname-error"
    );
    const subjectError = document.getElementById(
        "subject-error"
    );
    const messageError = document.getElementById(
        "message-error"
    );

    nameError.textContent = "";
    lastnameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";


    let isValid = true;

    if (name === "" || /\d/.test(name)) {
        nameError.textContent =
            "Please enter your name properly.";
        isValid = false;
    }

    if (lastname === "" || /\d/.test(name)) {
        lastnameError.textContent =
            "Please enter your last name properly.";
        isValid = false;
    }

    if (email === "" || !email.includes("@")) {
        emailError.textContent =
            "Please enter a valid email address.";
        isValid = false;
    }

    if (message === "" || message.length < 10) {
        messageError.textContent =
            "Please enter a message with at least 10 characters.";
        isValid = false;
    }

    if (subject === "" || subject.length < 5) {
        subjectError.textContent =
            "Please type your subject.";
        isValid = false;
    }

    return isValid;
}
