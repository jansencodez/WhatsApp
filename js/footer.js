import navigateTo from "./utils/navigateTo.js";

export default function loadFooter() {
  document.addEventListener("DOMContentLoaded", function () {
    fetch("/components/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer-placeholder").innerHTML = data;

        const title = document.getElementById("title");
        const chats = document.getElementById("chats");
        const updates = document.getElementById("updates");
        const communities = document.getElementById("communities");
        const calls = document.getElementById("calls");

        if (updates) {
          updates.addEventListener("click", () => {
            navigateTo("/pages/updates.html");
          });
        }

        if (chats) {
          chats.addEventListener("click", () => {
            navigateTo("/pages/chats.html");
          });
        }

        if (communities) {
          communities.addEventListener("click", () => {
            navigateTo("/pages/communities.html");
          });
        }

        if (calls) {
          calls.addEventListener("click", () => {
            navigateTo("/pages/calls.html");
          });
        }

        const options = document.querySelectorAll(".f-option");

        // Set the 'selected' class based on the current page
        const currentPath = window.location.pathname;
        options.forEach((option) => {
          if (option.id && currentPath.includes(option.id)) {
            option.classList.add("selected");
          }
        });

        // Add hover and click event listeners
        if (options) {
          options.forEach((option) => {
            option.addEventListener("mouseover", () => {
              if (!option.classList.contains("selected")) {
                option.classList.add("hover");
              }
            });

            option.addEventListener("mouseleave", () => {
              if (!option.classList.contains("selected")) {
                option.classList.remove("hover");
              }
            });

            option.addEventListener("click", () => {
              options.forEach((option) => {
                option.classList.remove("selected");
                option.classList.remove("hover");
              });

              option.classList.add("selected");
              option.classList.add("hover");
            });
          });
        }
      })
      .catch((error) => console.log("error loading footer:", error));
  });
}
