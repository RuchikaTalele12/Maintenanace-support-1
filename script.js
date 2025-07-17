function showRegister() {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("recoveryForm").style.display = "none";
}

function showLogin() {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("recoveryForm").style.display = "none";
}

function showRecovery() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("recoveryForm").style.display = "block";
}

function goBack() {
  document.getElementById("mainMenu").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("recoveryForm").style.display = "none";
}

function register(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const department = document.getElementById("department").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const password = document.getElementById("password").value;

  const globalId = "WIKA-" + Math.floor(Math.random() * 90000 + 10000);

  const user = {
    name, department, email, phone, location, password, globalId
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert(`✅ Registered!\nYour Global ID is: ${globalId}`);
  showLogin();
}

function login(event) {
  event.preventDefault();
  const globalId = document.getElementById("loginId").value;
  const password = document.getElementById("loginPass").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.globalId === globalId && user.password === password) {
    alert("✅ Login successful!");
    // You can redirect to dashboard here
  } else {
    alert("❌ Invalid Global ID or Password");
  }
}

function recover(event) {
  event.preventDefault();
  const phone = document.getElementById("recoveryPhone").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.phone === phone) {
    alert("🔐 Your password is: " + user.password);
  } else {
    alert("❌ No account found with that mobile number.");
  }
}
