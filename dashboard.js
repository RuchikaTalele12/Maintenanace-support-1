let ticketCount = parseInt(localStorage.getItem("ticketCount") || "1");

function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

function editProfile() {
  const name = prompt("Enter your name:", localStorage.getItem("userName"));
  const phone = prompt("Enter your phone:", localStorage.getItem("userPhone"));
  const username = prompt("Enter your username:", localStorage.getItem("userLogin"));
  if (name && phone && username) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("userLogin", username);
    location.reload();
  }
}

function showTicketOptions() {
  document.getElementById("formContainer").innerHTML = "";
  document.getElementById("ticketOptions").style.display = "flex";
}

function showForm(type) {
  const container = document.getElementById("formContainer");
  document.getElementById("ticketOptions").style.display = "none";

  if (type === "facility") {
    let step = 1;
    const selections = { building: "", area: "", subarea: "" };

    renderStep();

    function renderStep() {
      let html = `<h2>🏢 Facility Service</h2><form onsubmit="submitForm(event, 'Facility Service')">`;

      if (step === 1) {
        html += `<p><strong>Select Building</strong></p>
        <div class="button-group">
          ${["B1", "B2", "B3", "B4", "B5", "B6", "B7"].map(b =>
            `<button type="button" class="mini-btn" onclick="selectBuilding('${b}')">${b}</button>`).join("")}
        </div>`;
      } else if (step === 2) {
        html += `<p><strong>Select Area</strong></p>
        <div class="button-group">
          ${["Ground Floor", "First Floor", "Washroom", "Mezzanine Floor", "Basement"].map(a =>
            `<button type="button" class="mini-btn" onclick="selectArea('${a}')">${a}</button>`).join("")}
        </div>`;
      } else if (step === 3) {
        html += `<p><strong>Select Sub Area</strong></p>
        <div class="button-group">
          ${["CNC Shop", "Assembly Shop", "Reception", "Office", "HR", "ETM", "Store"].map(s =>
            `<button type="button" class="mini-btn" onclick="selectSubArea('${s}')">${s}</button>`).join("")}
        </div>`;
      } else if (step === 4) {
        html += `<p><strong>Description</strong></p>
        <textarea placeholder="Write your issue..." required></textarea>
        <input type="file" />
        <div class="button-nav">
          <button type="button" onclick="goBack()">⬅️ Back</button>
          <button type="submit">✅ Submit</button>
        </div>`;
      }

      if (step < 4) {
        html += `<div class="button-nav">
          ${step > 1 ? `<button type="button" onclick="goBack()">⬅️ Back</button>` : ""}
          <button type="button" onclick="goNext()">Next ➡️</button>
        </div>`;
      }

      html += `<button type="button" onclick="hideForm()">Cancel</button></form>`;
      container.innerHTML = html;
    }

    window.selectBuilding = val => { selections.building = val; goNext(); };
    window.selectArea = val => { selections.area = val; goNext(); };
    window.selectSubArea = val => { selections.subarea = val; goNext(); };

    window.goBack = () => { if (step > 1) step--; renderStep(); };
    window.goNext = () => { if (step < 4) step++; renderStep(); };
  }

  else if (type === "breakdown") {
    container.innerHTML = `
      <h2>⚙️ Breakdown Request</h2>
      <form onsubmit="submitForm(event, 'Breakdown')">
        <select required>
          <option>CNC Shop</option>
          <option>Assembly Shop</option>
          <option>ETM</option>
        </select>
        <textarea placeholder="Describe issue" required></textarea>
        <input type="file" />
        <button type="submit">Submit</button>
        <button type="button" onclick="hideForm()">Back</button>
      </form>`;
  }

  else if (type === "safety") {
    container.innerHTML = `
      <h2>🦺 Safety Concern</h2>
      <form onsubmit="submitForm(event, 'Safety')">
        <textarea placeholder="Describe the safety issue..." required></textarea>
        <input type="file" />
        <button type="submit">Submit</button>
        <button type="button" onclick="hideForm()">Back</button>
      </form>`;
  }

  else if (type === "track") {
    container.innerHTML = `
      <h2>🔍 Track Ticket</h2>
      <form onsubmit="trackTicket(event)">
        <input type="text" id="ticketId" placeholder="Enter Ticket ID" required />
        <button type="submit">Track</button>
        <button type="button" onclick="hideForm()">Back</button>
      </form>
      <div id="ticketStatus"></div>`;
  }
}

function hideForm() {
  document.getElementById("formContainer").innerHTML = "";
  document.getElementById("ticketOptions").style.display = "none";
}

function submitForm(e, type) {
  e.preventDefault();
  const form = e.target;
  const desc = form.querySelector("textarea")?.value || "No description";
  const id = "WIKA-" + String(ticketCount++).padStart(5, "0");

  const ticket = {
    id,
    type,
    desc,
    status: "Submitted",
    time: new Date().toLocaleString()
  };

  const list = JSON.parse(localStorage.getItem("tickets") || "[]");
  list.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(list));
  localStorage.setItem("ticketCount", ticketCount);

  alert(`✅ Ticket ${id} submitted successfully!`);
  hideForm();
}

function trackTicket(e) {
  e.preventDefault();
  const id = document.getElementById("ticketId").value.trim();
  const list = JSON.parse(localStorage.getItem("tickets") || "[]");
  const found = list.find(t => t.id === id);
  const div = document.getElementById("ticketStatus");
  div.innerHTML = found
    ? `<p>✅ Ticket <b>${found.id}</b> is <b style="color:green">${found.status}</b><br><small>${found.time}</small></p>`
    : `<p style="color:red;">❌ Ticket not found</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("username").innerText = localStorage.getItem("userName") || "User";
  document.getElementById("userphone").innerText = localStorage.getItem("userPhone") || "---";
  document.getElementById("userlogin").innerText = localStorage.getItem("userLogin") || "---";
});
