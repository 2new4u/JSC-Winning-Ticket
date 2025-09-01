async function loadData() {
  const response = await fetch("data/stats.json");
  const data = await response.json();
  return data;
}

function displayTicket(numbers, stars) {
  const ticketElement = document.getElementById("ticket");
  ticketElement.innerHTML = `
    <h3>${numbers.join(", ")}</h3>
    <h3>${stars.join(", ")}</h3>
  `;
}

function winningCalc(pool, count) {
  const pool = pool.flatMap((n) => Array(n.count).fill(n.number));
  const picks = [];
  while (picks.length < count) {
    const rand = pool[Math.floor(Math.random() * pool.length)];
    if (!picks.includes(rand)) picks.push(rand);
  }
  return picks;
}

async function getTicket(type) {
  const data = await loadData();
  const numbers = [];
  const stars = [];
  if (type === "hottest") {
    numbers = [...data.numbers]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((n) => n.number);

    stars = [...data.stars]
      .sort((a, b) => b.count - a.count)
      .slice(0, 2)
      .map((s) => s.number);
  } else if (type === "coldest") {
    numbers = [...data.numbers]
      .sort((a, b) => b.absence - a.absence)
      .slice(0, 5)
      .map((n) => n.number);

    stars = [...data.stars]
      .sort((a, b) => b.absence - a.absence)
      .slice(0, 2)
      .map((s) => s.number);
  } else {
    numbers = winningCalc(data.numbers, 5);
    stars = winningCalc(data.stars, 2);
  }

  displayTicket(numbers, stars);
}
