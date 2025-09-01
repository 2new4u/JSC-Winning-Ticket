function createEmojis() {
  const emojis = [
    { text: "💵" },
    { text: "💸" },
    { text: "💰" },
    { text: "🪙" },
    { text: "🤑" },
    { text: "💳" },
    { text: "💴" },
    { text: "💶" },
    { text: "💷" },
    { text: "🍀" },
  ];

  const { text } = emojis[Math.floor(Math.random() * emojis.length)];
  const emoji = document.createElement("div");

  emoji.classList.add("emoji");
  emoji.textContent = text;
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = 3 + Math.random() * 5 + "s";
  fontSize = 1 + Math.random() * 2;
  emoji.style.fontSize = fontSize + "rem";
  emoji.style.zIndex = fontSize < 2 ? -1 : 1;
  document.body.appendChild(emoji);

  emoji.addEventListener("animationend", () => {
    emoji.remove();
  });
}

setInterval(createEmojis, 1000);
