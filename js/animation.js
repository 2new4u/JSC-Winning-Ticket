function createEmojis() {
  const emojis = [
    { text: "💵" },
    { text: "💸" },
    { text: "💰" },
    { text: "🪙" },
  ];

  emojis.forEach(({ text }) => {
    const emoji = document.createElement("div");

    emoji.classList.add("emoji");
    emoji.textContent = text;
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = 3 + Math.random() * 5 + "s";
    emoji.style.fontSize = 1 + Math.random() * 2 + "rem";
    document.body.appendChild(emoji);

    emoji.addEventListener("animationend", () => {
      emoji.remove();
    });
  });
}

setInterval(createEmojis, 1000);
