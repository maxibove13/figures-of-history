
const loginButton = document.getElementById("login-button-id")

function activateButton() {
    emailLoginValue = document.getElementById('emailLogin').value,
    passLoginValue = document.getElementById('passLogin').value
    if (emailLoginValue != "" && passLoginValue != "") {
        loginButton.style.opacity = "1";
        loginButton.style.pointerEvents = "all";
    } else {
        loginButton.style.opacity = "0.5";
        loginButton.style.pointerEvents = "none";

    }
}




function loginValidation() {
let emailLoginValue = document.getElementById('emailLogin').value,
    passLoginValue = document.getElementById('passLogin').value
    if (emailLoginValue != "maxibove13@gmail.com" || passLoginValue != "deFi1984") {
        const errorContainer = document.querySelector('.errorMessage')
        const errorMessageTemplate = document.getElementById('email-or-password-incorrect-message-id')
        errorContainer.appendChild(errorMessageTemplate.content.cloneNode(true))
    } else {
        location.href = 'home.html';
    }
}

// When enter key is press, the button is  clicked. //
    window.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("login-button-id").click();
        }
    });