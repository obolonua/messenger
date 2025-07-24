async function loadMessages() {
  const res = await fetch("/messages");
  const data = await res.json();
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  data.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message " + (msg.sender === "You" ? "sent" : "received");
    div.textContent = msg.text;
    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  await fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadMessages();
}

loadMessages();

document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
