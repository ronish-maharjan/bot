var sendButton = document.getElementById("sendButton");
var textbox = document.getElementById("textbox");
var chatContainer = document.getElementById("chatContainer");

/* -----------------------------
   UI Functions
--------------------------------*/
function sendMessage(userMessage) {
  var messageElement = document.createElement("div");
  messageElement.className = "message user-message";
  messageElement.innerText = userMessage;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/* -----------------------------
   Backend Chatbot Request
--------------------------------*/
function chatbotResponse(userMessage) {
  fetch("http://localhost:3000/api/chat", {   // <-- Your Node.js backend API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then((res) => res.json())
    .then((data) => {
      var messageElement = document.createElement("div");
      messageElement.className = "message bot-message";
      messageElement.innerText = data.response;

      setTimeout(() => {
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 600);
    })
    .catch(() => {
      alert("Server error. Make sure your backend is running!");
    });
}

/* -----------------------------
   Events
--------------------------------*/
sendButton.addEventListener("click", sendUserInput);

textbox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendUserInput();
  }
});

function sendUserInput() {
  var userText = textbox.value.trim();

  if (userText === "") {
    alert("Please type a message");
    return;
  }

  textbox.value = "";
  sendMessage(userText);
  chatbotResponse(userText);
}
