function runAI() {
  const gender = document.getElementById("gender").value;
  const season = document.getElementById("season").value;
  const note = document.getElementById("note").value;

  const scored = perfumes.map(p => {
    let score = 0;
    if (p.gender === gender || p.gender === "unisex") score += 30;
    if (p.season.includes(season)) score += 30;
    if (p.notes.includes(note)) score += 40;
    return { ...p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  document.getElementById("result").innerHTML = `
    ✨ <b>${best.name}</b><br>
    Uyumluluk: <b>%${best.score}</b><br>
    ${note} notalarını sevdiğin ve ${season} için uygun olduğu için önerildi.
  `;

  renderPerfumes(scored);
}


const grid = document.getElementById("perfume-grid");

function renderPerfumes(list) {
  grid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "perfume-card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><i>${p.brand}</i></p>
      <div>${p.notes.map(n => `<span class="tag">${n}</span>`).join("")}</div>
    `;

    grid.appendChild(card);
  });
}

renderPerfumes(perfumes);
