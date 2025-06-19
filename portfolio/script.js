// Get references to the form containers and toggle links
const loginFormContainer = document.getElementById('loginFormContainer');
const signUpFormContainer = document.getElementById('signUpFormContainer');
const showSignUpLink = document.getElementById('showSignUp');
const showLoginLink = document.getElementById('showLogin');

// Toggle to Sign-Up Form
showSignUpLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginFormContainer.classList.add('hidden');
  signUpFormContainer.classList.remove('hidden');
});

// Toggle to Login Form
showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  signUpFormContainer.classList.add('hidden');
  loginFormContainer.classList.remove('hidden');
});

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'user' && password === 'password') {
    alert('Login successful!');
  } else {
    document.getElementById('errorMessage').textContent = 'Invalid username or password.';
  }
});

// Handle Sign-Up Form Submission
document.getElementById('signUpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    document.getElementById('signUpErrorMessage').textContent = 'Passwords do not match.';
  } else {
    alert('Sign-Up successful!');
    signUpFormContainer.classList.add('hidden');
    loginFormContainer.classList.remove('hidden');
  }
});