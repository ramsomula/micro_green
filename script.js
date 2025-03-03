let entries = [];

function addEntry() {
  const username = document.getElementById("username").value;
  const microgreen = document.getElementById("microgreen").value;
  const germination = document.getElementById("germination").value;
  const growth = document.getElementById("growth").value;
  const harvest = document.getElementById("harvest").value;

  if (!username || !microgreen || !harvest) {
    alert("Please fill all required fields.");
    return;
  }

  entries.push({ username, microgreen, germination, growth, harvest });
  updateTable();
  updateChart();
}

function updateTable() {
  const tableBody = document.getElementById("logTable");
  tableBody.innerHTML = "";
  entries.forEach((entry) => {
    let row = `<tr>
                  <td>${entry.username}</td>
                  <td>${entry.microgreen}</td>
                  <td>${entry.germination}</td>
                  <td>${entry.growth}</td>
                  <td>${entry.harvest}</td>
               </tr>`;
    tableBody.innerHTML += row;
  });
}

function updateChart() {
  const ctx = document.getElementById("growthChart").getContext("2d");
  const labels = entries.map((e) => e.microgreen);
  const data = entries.map((e) => {
    return Math.max(
      0,
      (new Date(e.harvest).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Days Until Harvest",
          data: data,
          backgroundColor: "green",
        },
      ],
    },
  });
}
