let users = [
  { username: "John", password: "password123" },
  { username: "Msee wa home", password: "mypassword" },
  { username: "Kiptoo", password: "password1" },
  // Add more users as needed
];

function signUp(event) {
  event.preventDefault();

  const newUsername = document.getElementById("new-username").value.trim(); // Get value of the input field and trim whitespace
  const newPassword = document.getElementById("new-password").value; // Get value of the input field
  const signUpMessage = document.getElementById("sign-up-message");

  // Log the username being checked for debugging
  console.log("Checking if user exists:", newUsername);

  // Check if a user with the same username already exists
  const existingUser = users.find(
    (user) => user.username.toLowerCase() === newUsername.toLowerCase()
  ); // Case-insensitive check

  if (existingUser) {
    signUpMessage.textContent = "User already exists. Please sign in.";
    return;
  }

  // Add the new user to the users array
  users.push({ username: newUsername, password: newPassword });

  signUpMessage.textContent = "Sign up successful. You can proceed to sign in.";

  // Redirect to sign-in page after a short delay
  setTimeout(() => {
    window.location.href = "sign-in.html"; // Adjust this URL as needed
  }, 1000);
}
