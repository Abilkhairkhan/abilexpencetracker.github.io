const chatIcon = document.getElementById("chatbot-icon");
const chatWindow = document.getElementById("chat-window");
const chatBody = document.getElementById("chat-body");

chatIcon.onclick = () => chatWindow.classList.toggle("hidden");
document.getElementById("close-chat").onclick = () => chatWindow.classList.add("hidden");

document.getElementById("sendMessage").onclick = async () => {
  const input = document.getElementById("userMessage");
  const text = input.value.trim();
  if (!text) return;
  appendMessage("user", text);
  input.value = "";

  const reply = await askAI(text);
  appendMessage("bot", reply);
};

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function askAI(prompt) {
  const apiKey = "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"; // Мұнда өзіңнің OpenAI API кілтіңді қой
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Сен қаржы ассистентісің. Пайдаланушы қай тілде жазса, сол тілде жауап бер."
          },
          { role: "user", content: prompt }
        ]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    return "Қате пайда болды. API кілтті тексеріңіз.";
  }
}
