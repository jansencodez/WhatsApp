const users = [
  { username: "John", password: "password123" },
  { username: "Msee wa home", password: "mypassword" },
  { username: "Kiptoo", password: "password1" },
];

function signIn(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    console.log("Sign in successful for user:", username);
    errorMessage.textContent = "";
    window.location.href = "/pages/chats.html";
  } else {
    errorMessage.textContent = "Invalid username or password.";
  }
}
