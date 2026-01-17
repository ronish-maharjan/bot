const sendButton = document.getElementById("sendButton");
const textbox = document.getElementById("textbox");
const chatContainer = document.getElementById("chatContainer");

sendButton.addEventListener("click", async () => {
  const message = textbox.value.trim();
  if (!message) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-message user";
  userMsg.textContent = message;
  chatContainer.appendChild(userMsg);

  textbox.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Send to backend API
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    const botMsg = document.createElement("div");
    botMsg.className = "chat-message bot";
    botMsg.textContent = data.response;
    chatContainer.appendChild(botMsg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (err) {
    console.error(err);
  }
});

// Send message on Enter key
textbox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendButton.click();
});
