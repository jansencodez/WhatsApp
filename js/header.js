export default function loadHeader() {
  document.addEventListener("DOMContentLoaded", function () {
    fetch("/components/header.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("header-placeholder").innerHTML = data;

        // Now that the header is loaded, set the title
        let text = "";
        const title = document.getElementById("title");
        const path = window.location.pathname;

        if (title) {
          // Ensure the title element exists
          if (path.includes("updates")) {
            text = "Updates";
          } else if (path.includes("chats")) {
            text = "WhatsApp";
          } else if (path.includes("communities")) {
            text = "Communities";
          } else if (path.includes("calls")) {
            text = "Calls";
          }
          title.innerHTML = `<h1>${text}</h1>`;
        }
      })
      .catch((error) => console.error("Error loading header:", error));
  });
}
