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

async function getHottestTicket() {
  const data = await loadData();

  const hottestNumbers = [...data.numbers]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((n) => n.number);

  const hottestStars = [...data.stars]
    .sort((a, b) => b.count - a.count)
    .slice(0, 2)
    .map((s) => s.number);

  displayTicket(hottestNumbers, hottestStars);
}

async function getColdestTicket() {
  const data = await loadData();

  const coldestNumbers = [...data.numbers]
    .sort((a, b) => b.absence - a.absence)
    .slice(0, 5)
    .map((n) => n.number);

  const coldestStars = [...data.stars]
    .sort((a, b) => b.absence - a.absence)
    .slice(0, 2)
    .map((s) => s.number);

  displayTicket(coldestNumbers, coldestStars);
}

async function getWinningTicket() {
  const data = await loadData();

  function winningCalc(pool, count) {
    const expanded = pool.flatMap((n) => Array(n.count).fill(n.number));
    const picks = [];
    while (picks.length < count) {
      const rand = expanded[Math.floor(Math.random() * expanded.length)];
      if (!picks.includes(rand)) picks.push(rand);
    }
    return picks;
  }

  const numbers = winningCalc(data.numbers, 5);
  const stars = winningCalc(data.stars, 2);

  displayTicket(numbers, stars);
}
