const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById("email");
const emailError = document.querySelector('#email + span.error');

const pass = document.getElementById("password");
const checkPass = document.getElementById("passwordConfirm")
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const numb = document.getElementById("number");
const leng = document.getElementById("length");
const mismatch = document.getElementById("mismatch");

const zipCode = document.getElementById("zipcode");
const zipError = document.querySelector('#zipcode + span.error');

zipCode.addEventListener('input', function (event) {
  if (zipCode.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    zipError.textContent = ''; // Reset the content of the message
    zipError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showErrorZip();
  }
});

function showErrorZip() {
  if(zipCode.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    zipError.textContent = 'You need to enter a Zip Code of your area.';
  
  } else if(zipCode.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    zipError.textContent = `Zip Code should be at least ${ zipCode.minLength } characters; you entered ${ zipCode.value.length }.`;
  }

  // Set the styling appropriately
  zipError.className = 'error active';
}

// When the user clicks on the password field, show the message box
pass.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
pass.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user clicks on the password confirm field, show the message box
checkPass.onfocus = function() {
  document.getElementById("message2").style.display = "block";
}

// When the user clicks outside of the password confirm field, hide the message box
checkPass.onblur = function() {
  document.getElementById("message2").style.display = "none";
}

// When the user starts to type something inside the password field
pass.onkeyup = (e) => showErrorPass(e);
function showErrorPass(ev) {
  console.log(ev);
  const val = ev.target.value;
  let flag = true;
  // Validate lowercase letters
  const lowerCaseLetters = val.match(/[a-z]/g);
  if(lowerCaseLetters) {
    console.log(letter);
    letter.classList.remove("invalidRed");
    letter.classList.add("validGreen");
    flag = flag && false;
  } else if (!lowerCaseLetters) {
    console.log(letter);
    letter.classList.remove("validGreen");
    letter.classList.add("invalidRed");
    flag = flag && true;

  }

  // Validate capital letters
  const upperCaseLetters = val.match(/[A-Z]/g);
  if(upperCaseLetters) {
    console.log(capital);
    capital.classList.remove("invalidRed");
    capital.classList.add("validGreen");
    flag = flag && false;
  } else if (!upperCaseLetters){
    console.log(capital);
    capital.classList.remove("validGreen");
    capital.classList.add("invalidRed");
    flag = flag && true;
  }

  // Validate numbers
  const numbers = val.match(/[0-9]/g);
  if(numbers) {
    numb.classList.remove("invalidRed");
    numb.classList.add("validGreen");
    flag = flag && false;
  } else if (!numbers) {
    numb.classList.remove("validGreen");
    numb.classList.add("invalidRed");
    flag = flag && true;
  }

  // Validate length
  if(val.length >= 8) {
    leng.classList.remove("invalidRed");
    leng.classList.add("validGreen");
    flag = flag && false;
  } else if (val.length < 8) {
    leng.classList.remove("validGreen");
    leng.classList.add("invalidRed");
    flag = flag && true;
  }
  return flag;
}

checkPass.onkeyup = (e) => showErrorCheckPass(e);
function showErrorCheckPass(ev) {
  const val = ev.target.value;
  let flag = true;
  if (pass.value === val) {
    mismatch.classList.remove("invalidRed");
    mismatch.classList.add("validGreen");
    mismatch.innerHTML = 'Your passwords match!';
    flag = false;
  } else {
    mismatch.classList.add("validGreen");
    mismatch.classList.remove("invalidRed");
    mismatch.innerHTML = 'Your passwords do not match';
  }
  return flag;
}

email.addEventListener('input', function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ''; // Reset the content of the message
    emailError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showErrorEmail();
  }
});
  
function showErrorEmail() {
  if(email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if(email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if(email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
  }

  // Set the styling appropriately
  emailError.className = 'error active';
}

form.addEventListener('submit', function (event) {
  // if the email field is valid, we let the form submit

  if(!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorEmail();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }

  if(!zipCode.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorZip();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }

  if(showErrorPass() || showErrorCheckPass()) {
    event.preventDefault();
  }
});
