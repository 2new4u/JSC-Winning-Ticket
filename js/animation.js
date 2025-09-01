function createCash() {
  const cash = document.createElement("div");
  cash.classList.add("money");
  cash.textContent = "💸";

  cash.style.left = Math.random() * 100 + "vw";
  cash.style.animationDuration = 3 + Math.random() * 5 + "s";
  cash.style.fontSize = 1 + Math.random() * 2 + "rem";

  document.body.appendChild(cash);

  cash.addEventListener("animationend", () => {
    cash.remove();
  });
}

setInterval(createCash, 300);
