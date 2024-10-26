import chatsData from "./data/chatsData.js";
import loadFooter from "./footer.js";
import loadHeader from "./header.js";

function navigateTo(url) {
  window.location.href = url; // Change the URL to the specified page
}
loadHeader();
loadFooter();

let chatsContainer = document.querySelector("#chats-container");
document.addEventListener("DOMContentLoaded", () => {
  if (chatsContainer) {
    populateMsg();
  }
});
function populateMsg() {
  let chatHTML = "";
  chatsData.forEach((chatData) => {
    chatHTML += `
      <div class='message'>
        <div>
          <img src='${chatData.profileImage}' alt='profile image'>
        </div>
        <div>
          <div>${chatData.userName}</div>
          <div>${chatData.msg}</div>
          <span>3</span>
        </div>
        <div>${chatData.time} ${timeSuffix(chatData.time)}</div>
      </div>
    `;
  });

  chatsContainer.innerHTML = chatHTML;
}

function timeSuffix(timeString) {
  let time = Number(timeString) * 100; // 12.03 > 1203
  let suffix;

  if (time <= 1200) {
    suffix = "am";
  } else {
    suffix = "pm";
  }

  return suffix;
}
