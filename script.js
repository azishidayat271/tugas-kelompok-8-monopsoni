document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const chatMessage = document.getElementById("chatMessage");
  const sendBtn = document.getElementById("sendBtn");
  const clearBtn = document.getElementById("clearChat");

  // load chat dari localStorage
  let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  function renderMessages() {
    chatBox.innerHTML = "";
    messages.forEach(msg => {
      const div = document.createElement("div");
      div.classList.add("chat-message", msg.sender);
      div.textContent = msg.text;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function addMessage(text, sender = "user") {
    if (text.trim() === "") return;

    const newMsg = { text, sender };
    messages.push(newMsg);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    renderMessages();
  }

  function handleSend() {
    const userText = chatMessage.value;
    if (userText.trim() === "") return;

    // pesan user
    addMessage(userText, "user");
    chatMessage.value = "";

    // balasan bot
    setTimeout(() => {
      addMessage("Terima kasih, pertanyaanmu sudah diterima", "bot");
    }, 800);
  }

  sendBtn.addEventListener("click", handleSend);
  chatMessage.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });

  // tombol hapus semua pesan
  clearBtn.addEventListener("click", () => {
    messages = [];
    localStorage.removeItem("chatMessages");
    renderMessages();
  });

  // render awal
  renderMessages();
});

