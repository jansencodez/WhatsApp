import chatsData from "./data/chatsData.js";
import loadFooter from "./footer.js";
import loadHeader from "./header.js";
import formatTime from "./utils/formatTime.js";

loadHeader(); // Loads the header with the default title
loadFooter();

const chatsContainer = document.getElementById("chats-container");
const chatRoomContainer = document.getElementById("chat-room");

document.addEventListener("DOMContentLoaded", () => {
  if (chatsContainer) {
    populateMsg();
  }
});

function populateMsg() {
  let chatHTML = "";
  chatsData.forEach((chatData) => {
    // Access the first chatroom's messages for the preview
    const lastMessage =
      chatData.chatrooms[0]?.messages[
        chatData.chatrooms[0].messages.length - 1
      ];
    chatHTML += `
      <div class='message' onclick="openChatRoom(${chatData.id})">
        <div>
          <img src='${chatData.profileImage}' alt='profile image'>
        </div>
        <div>
          <div>${chatData.userName}</div>
          <div>${lastMessage ? lastMessage.text : "No messages yet"}</div>
          <span>${chatData.chatrooms[0]?.messages.length || 0}</span>
        </div>
        <div>${lastMessage ? formatTime(lastMessage.time) : ""}</div>
      </div>
    `;
  });

  chatsContainer.innerHTML = chatHTML;
}

function renderMessages(chatData) {
  const chatroom = chatData.chatrooms[0]; // Assuming we are using the first chatroom
  chatRoomContainer.innerHTML = chatroom.messages
    .map(
      (msg) => `
      <section class="chat-room-message">
        <p>${msg.text}</p>
        <span>${formatTime(msg.time)}</span>
      </section>`
    )
    .join("");
}

let currentChatID;

window.openChatRoom = function (chatID) {
  currentChatID = chatID;
  console.log("Opening chat room for ID:", chatID); // Debug log
  const chatData = chatsData.find((chat) => chat.id === chatID);
  console.log("Chat Data Found:", chatData); // Debug log

  if (chatData) {
    chatsContainer.style.display = "none";
    chatRoomContainer.style.display = "block";
    document.getElementById("nav").style.display = "none";

    loadHeader(chatData.userName).then(() => renderMessages(chatData));

    loadFooter(
      `<form onsubmit="send(event,${currentChatID})">
        <section class="r-input">
          <input id="r-message" placeholder="message" name="message">
        </section>
        <section class="r-send">
          <button type="submit">Send</button>
        </section>
      </form>
      `,
      currentChatID
    );
  } else {
    console.error("No chat data found for ID:", chatID); // Debug log
  }
};

window.closeChatRoom = function () {
  if (chatsContainer && chatRoomContainer) {
    chatRoomContainer.style.display = "none";
    chatsContainer.style.display = "block";

    // Reset header to default title when returning to chat list
    loadHeader();
  }
};

window.send = function send(e, id) {
  e.preventDefault();
  const messageInput = document.getElementById("r-message");
  const message = messageInput.value;

  if (message) {
    console.log(message, "sent");

    const currentChatData = chatsData.find((chat) => chat.id === currentChatID);

    if (
      currentChatData &&
      Array.isArray(currentChatData.chatrooms) &&
      currentChatData.chatrooms.length > 0
    ) {
      const chatroom = currentChatData.chatrooms[0]; // Access the first chatroom

      chatroom.messages.push({
        text: message,
        time: new Date().toISOString(),
      }); // Add message with current time
      console.log("Updated chat data:", currentChatData);
      renderMessages(currentChatData);
    } else {
      console.error("No chat data found or chatrooms are not defined");
    }

    messageInput.value = ""; // Clear the input after sending
  } else {
    console.log("Please enter a message.");
  }
};
