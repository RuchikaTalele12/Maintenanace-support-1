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
    renderFacilityStep();

    function renderFacilityStep() {
      let html = `<h2>🏢 Facility Service</h2><form onsubmit="submitForm(event, 'Facility Service')">`;

      if (step === 1) {
        html += `<p><strong>Select Building No.</strong></p>
        <div class="button-group">
          <button type="button" class="mini-btn">Building 1</button>
          <button type="button" class="mini-btn">Building 2</button>
          <button type="button" class="mini-btn">Building 3</button>
        </div>`;
      } else if (step === 2) {
        html += `<p><strong>Select Area Code</strong></p>
        <div class="button-group">
          <button type="button" class="mini-btn">Ground Floor</button>
          <button type="button" class="mini-btn">First Floor</button>
          <button type="button" class="mini-btn">Washroom</button>
        </div>`;
      } else if (step === 3) {
        html += `<p><strong>Select Sub Area</strong></p>
        <div class="button-group">
          <button type="button" class="mini-btn">Assembly Shop</button>
          <button type="button" class="mini-btn">CNC Shop</button>
          <button type="button" class="mini-btn">Purchase</button>
        </div>`;
      } else if (step === 4) {
        html += `<p><strong>Service Description</strong></p>
        <textarea placeholder="Write your issue..." required></textarea>
        <input type="file" />`;
      }

      html += `<div class="button-nav">
        ${step > 1 ? `<button type="button" onclick="goBack()">⬅️ Back</button>` : ""}
        ${step < 4 ? `<button type="button" onclick="goNext()">Next ➡️</button>` : ""}
        ${step === 4 ? `<button type="submit">✅ Submit</button>` : ""}
      </div>
      <button type="button" onclick="hideForm()">Back</button>
      </form>`;

      container.innerHTML = html;
    }

    window.goBack = () => { if (step > 1) step--; renderFacilityStep(); };
    window.goNext = () => { if (step < 4) step++; renderFacilityStep(); };

  } else if (type === "breakdown") {
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
  } else if (type === "safety") {
    container.innerHTML = `
      <h2>🦺 Safety Concern</h2>
      <form onsubmit="submitForm(event, 'Safety')">
        <textarea placeholder="Describe the safety issue..." required></textarea>
        <input type="file" />
        <button type="submit">Submit</button>
        <button type="button" onclick="hideForm()">Back</button>
      </form>`;
  } else if (type === "track") {
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
