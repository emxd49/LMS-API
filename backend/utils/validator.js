const validateEmail = () => {};

const validatePasswordInput = (password) => {
  const regex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  );
  return regex.test(password);
};
const validateEmailInput = (username) => {
  // to implement
};

module.exports = { validatePasswordInput };
