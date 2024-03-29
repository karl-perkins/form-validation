const form = document.querySelector("form");
const email = document.querySelector("#mail");
const country = document.querySelector("#country");
const zipCode = document.querySelector("#zip-code");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password-confirm");

email.addEventListener("input", (e) => {
  if (email.validity.valueMissing) {
    email.setCustomValidity("Email address is required.");
  } else {
    email.setCustomValidity("");
  }

  email.reportValidity();
});

zipCode.addEventListener("input", (e) => {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const constraint = new RegExp(constraints[country.value][0], "");

  if (constraint.test(zipCode.value)) {
    zipCode.setCustomValidity("");
  } else {
    zipCode.setCustomValidity(constraints[country.value][1]);
  }

  zipCode.reportValidity();
});

password.addEventListener("input", (e) => {
  const upperCaseConstraint = new RegExp("(?=.*?[A-Z])");
  const lowerCaseConstraint = new RegExp("(?=.*?[a-z])");
  const digitConstraint = new RegExp("(?=.*?[0-9])");
  const specialCharacterConstraint = new RegExp("(?=.*?[#?!@$ %^&*-])");

  if (password.validity.toShort) {
    password.setCustomValidity("Password must be 8 characters long.");
  } else if (!upperCaseConstraint.test(password.value)) {
    password.setCustomValidity(
      "Password must contain at least one upper case character"
    );
  } else if (!lowerCaseConstraint.test(password.value)) {
    password.setCustomValidity(
      "Password must contain at least one lower case character"
    );
  } else if (!digitConstraint.test(password.value)) {
    password.setCustomValidity(
      "Password must contain at least one numerical character"
    );
  } else if (!specialCharacterConstraint.test(password.value)) {
    password.setCustomValidity(
      "Password must contain at least one special character"
    );
  } else {
    password.setCustomValidity("");
  }

  password.reportValidity();
});

passwordConfirm.addEventListener("input", (e) => {
  if (passwordConfirm.value === password.value) {
    passwordConfirm.setCustomValidity("");
  } else {
    passwordConfirm.setCustomValidity("Passwords don't match");
  }
  
  passwordConfirm.reportValidity();
});
