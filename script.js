const API = "http://localhost:3000";

// classify waste
async function classify() {
  const item = document.getElementById("wasteInput").value;

  const res = await fetch(API + "/classify", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ item })
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.category;
}

// schedule pickup
async function schedule() {
  const data = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    type: document.getElementById("type").value,
    date: document.getElementById("date").value
  };

  await fetch(API + "/pickup", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  alert("Pickup Scheduled ✅");
}

// load pickups
async function loadPickups() {
  const res = await fetch(API + "/pickups");
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.name} - ${p.type} - ${p.date}`;
    list.appendChild(li);
  });
}