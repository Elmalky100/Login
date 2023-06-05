var signinEmail = document.getElementById("signinEmail")
var signinPassword = document.getElementById("signinPassword")
var signUpName = document.getElementById("signUpName")
var signUpEmail = document.getElementById("signUpEmail")
var signUpPassword = document.getElementById("signUpPassword")

var signUpArray = []
if (localStorage.getItem("users") != null) {
    signUpArray = JSON.parse(localStorage.getItem("users"))
}
function signUp() {
    if (emptySignUp() == false) {
        document.getElementById("exist").innerHTML = '<span class="text-danger m-3 fw-semibold">All inputs is required</span>'
        return false
    }
    if (validation_UserName()==true && validation_Email()==true && validation_Password()== true) {
        if (emailExist() == true) {
            var signUp = {
                name: signUpName.value,
                email: signUpEmail.value,
                password: signUpPassword.value
            }
            signUpArray.push(signUp)
            localStorage.setItem("users", JSON.stringify(signUpArray))
            document.getElementById("exist").innerHTML = '<span class="text-success m-3 fw-semibold">Success</span>'
        }
        else {
            document.getElementById("exist").innerHTML = '<span class="text-danger m-3 fw-semibold">email already exists</span>'
        }
    }
}

function login() {
    if (emptySignIn() == false) {
        document.getElementById("incorrect").innerHTML = '<span class="text-danger m-3 fw-semibold">All inputs is required</span>'
        return false
    }
    for (let i = 0; i < signUpArray.length; i++) {
        if (signinEmail.value.toLowerCase() == signUpArray[i].email.toLowerCase() && signinPassword.value.toLowerCase() == signUpArray[i].password) {
            localStorage.setItem("usersName", signUpArray[i].name)
            console.log(signUpArray[i].name)
            window.location.href="home.html"
        }
        else {
            document.getElementById("incorrect").innerHTML = '<span class="text-danger m-3 fw-semibold">incorrect email or password</span>'
        }
    }
}

function emptySignUp() {
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        return false
    }
    else {
        return true
    }
}

function emailExist() {
    let result = signUpArray.find((el) => {
        return el.email.toLowerCase() == signUpEmail.value.toLowerCase()
    })
    if (result == undefined) {
        return true
    }
    else {
        return false
    }
}

function emptySignIn() {
    if (signinEmail.value == "" || signinPassword.value == "") {
        return false
    }
    else {
        return true
    }
}

var userName = ""
if (userName = localStorage.getItem("usersName")) {
    document.getElementById("userName").innerHTML = "Welcome " + userName
}

function logOut() {
    localStorage.removeItem("usersName")
}


function validation_UserName() {
    let reg = /^[A-Za-z][A-Za-z0-9_]{2,10}$/;
    if (reg.test(signUpName.value) == true){
        signUpName.classList.add("is-valid")
        signUpName.classList.remove("is-invalid")
        return true
    }
    else{
        document.getElementById("exist").innerHTML = '<span class="text-danger m-3 fw-semibold">The inputs is invalid</span>'
        signUpName.classList.remove("is-valid")
        signUpName.classList.add("is-invalid")
        return false
    }
}

function validation_Email() {
    let reg = /^[a-zA-Z0-9-_]{3,20}@[a-zA-Z]{3,10}\.[a-zA-Z]{2,3}$/;
    if (reg.test(signUpEmail.value) == true){
        signUpEmail.classList.add("is-valid")
        signUpEmail.classList.remove("is-invalid")
        return true
    }
    else{
        document.getElementById("exist").innerHTML = '<span class="text-danger m-3 fw-semibold">The inputs is invalid</span>'
        signUpEmail.classList.remove("is-valid")
        signUpEmail.classList.add("is-invalid")
        return false
    }
}


function validation_Password() {
    let reg = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (reg.test(signUpPassword.value) == true){
        signUpPassword.classList.add("is-valid")
        signUpPassword.classList.remove("is-invalid")
        return true
    }
    else{
        document.getElementById("exist").innerHTML = '<span class="text-danger m-3 fw-semibold">The inputs is invalid</span>'
        signUpPassword.classList.remove("is-valid")
        signUpPassword.classList.add("is-invalid")
        return false
    }
}