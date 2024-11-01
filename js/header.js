export default function loadHeader(title = "WhatsApp") {
  return new Promise((resolve) => {
    fetch("/components/header.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById("header-placeholder").innerHTML = data;

        const titleElement = document.getElementById("title");
        const path = window.location.pathname;

        let text = title; // Start with the provided title

        // Determine the title based on the current path
        if (titleElement) {
          if (path.includes("updates")) {
            text = "Updates";
          } else if (path.includes("chats")) {
            text = "WhatsApp"; // Default title for chats
            if (
              document.getElementById("chat-room").style.display === "block"
            ) {
              text = title; // Use the passed title if in a chat room
            }
          } else if (path.includes("communities")) {
            text = "Communities";
          } else if (path.includes("calls")) {
            text = "Calls";
          }
          titleElement.innerHTML = `<h1>${text}</h1>`;
        }

        resolve(); // Resolve the promise after setting the title
      })
      .catch((error) => {
        console.error("Error loading header:", error);
        resolve(); // Resolve even on error to avoid hanging
      });
  });
}
