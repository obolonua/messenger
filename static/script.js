
let currentUser = null;
let users = [];

async function loadUsers() {
  console.log("loadUsers()")
  // Replace this with real users from ssl database
  users = ["Alice", "Bob", "Charlie"];
  renderUserList();
  if (users.length > 0) {
    selectUser(users[0]);
  }
}

function renderUserList() {
  const userListDiv = document.getElementById("userList");
  userListDiv.innerHTML = "";
  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user" + (user === currentUser ? " active" : "");
    div.textContent = user;
    div.onclick = () => selectUser(user);
    userListDiv.appendChild(div);
  });
}

async function selectUser(user) {
  console.log("selectUser() " + user)
  currentUser = user;
  renderUserList();
  await loadMessages();
}

async function loadMessages() {
  console.log("loadMessages()")
  console.log("")
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
  console.log("sendMessage()")
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
loadUsers();

document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
