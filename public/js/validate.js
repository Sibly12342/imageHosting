var registerRepeatPassword = document?.getElementById("registerRepeatPassword");
var registerPassword = document?.getElementById("registerPassword");
var registerEmail = document?.getElementById("registerEmail");
var registerUsername = document?.getElementById("registerUsername");
var registerName = document?.getElementById("registerName");
var loginPassword = document?.getElementById("loginPassword");
var loginName = document?.getElementById("loginName");

let arraySignup = [
  registerRepeatPassword,
  registerPassword,
  registerEmail,
  registerUsername,
  registerName,
];
let arrayLogin = [loginPassword, loginName];

function verifySignup() {
  if (
    registerRepeatPassword.value == "" ||
    registerPassword.value == "" ||
    registerEmail.value == "" ||
    registerUsername.value == "" ||
    registerName.value == ""
  ) {
    arraySignup.forEach((elm) => {
      console.log(elm.getAttribute("id"));
      let val = document.getElementById(`${elm?.getAttribute("id")}-label`);
      if (elm.value == "") {
        val.style.color = "red";
        val.style.outline = "red";
      } else {
        val.style.color = "black";
        val.style.outline = "black";
      }
    });

    if (registerPassword.value != registerRepeatPassword.value) {
      let val = document.getElementById(
        `${registerRepeatPassword?.getAttribute("id")}-label`
      );
      val.innerText = "Repeat Password Error";
      val.style.color = "red";
      val.style.outline = "red";
    } else {
      let val = (document.getElementById(
        `${registerRepeatPassword?.getAttribute("id")}-label`
      ).innerText = "Repeat Password");
    }
    return false;
  } else {
    return true;
  }
}

function verifyLogin() {
  if (loginPassword.value == "" || loginName.value == "") {
    arrayLogin.forEach((elm) => {
      console.log(elm.getAttribute("id"));
      let val = document.getElementById(`${elm?.getAttribute("id")}-label`);
      if (elm.value == "") {
        val.style.color = "red";
        val.style.outline = "red";
      } else {
        val.style.color = "black";
        val.style.outline = "black";
      }
    });
    return false;
  } else {
    console.log("true");
    return true;
  }
}
