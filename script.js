let records = JSON.parse(localStorage.getItem("records")) || [];

function renderTable(data = records) {
  const tbody = document.querySelector("#table tbody");
  tbody.innerHTML = "";
  data.forEach((r, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${r.date}</td>
        <td>${r.category}</td>
        <td>${r.amount}</td>
        <td><button onclick="deleteRecord(${i})">Өшіру</button></td>
      </tr>`;
  });
  const total = data.reduce((sum, r) => sum + Number(r.amount), 0);
  document.getElementById("total").textContent = `Жалпы баланс: ${total} ₸`;
  localStorage.setItem("records", JSON.stringify(records));
}

document.getElementById("add").onclick = () => {
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;
  if (!date || !category || !amount) return alert("Барлық өрісті толтырыңыз!");
  records.push({ date, category, amount });
  renderTable();
};

function deleteRecord(i) {
  records.splice(i, 1);
  renderTable();
}

document.getElementById("filterBtn").onclick = () => {
  const f = document.getElementById("filterCategory").value.toLowerCase();
  const filtered = records.filter(r => r.category.toLowerCase().includes(f));
  renderTable(filtered);
};

document.getElementById("showAll").onclick = () => renderTable();

document.getElementById("export").onclick = () => {
  let csv = "Күн,Категория,Сома\n";
  records.forEach(r => csv += `${r.date},${r.category},${r.amount}\n`);
  const blob = new Blob([csv], { type: "text/xlsx" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "qarzhy_esep.xlsx";
  link.click();
};

renderTable();
