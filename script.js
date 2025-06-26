function validateLogin() {
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;
  let emailError = document.getElementById("loginEmailError");
  let passError = document.getElementById("loginPasswordError");
  let valid = true;

  emailError.textContent = "";
  passError.textContent = "";

  if (!email) {
    emailError.textContent = "Email is required.";
    valid = false;
  }
  if (!pass) {
    passError.textContent = "Password is required.";
    valid = false;
  }

  // If valid, redirect to dashboard
  if (valid) {
    window.location.href = "dashboard.html";
  }

  return false; // Prevent default form submission
}


function validateSignup() {
  let username = document.getElementById("signupUsername").value;
  let email = document.getElementById("signupEmail").value;
  let pass = document.getElementById("signupPassword").value;
  let captcha = document.getElementById("captcha").checked;

  document.getElementById("signupUsernameError").textContent = "";
  document.getElementById("signupEmailError").textContent = "";
  document.getElementById("signupPasswordError").textContent = "";
  document.getElementById("captchaError").textContent = "";

  let successMsg = document.getElementById("signupSuccessMessage");
  successMsg.style.display = "none";
  successMsg.textContent = "";

  let valid = true;

  if (!username) {
    document.getElementById("signupUsernameError").textContent = "Username is required.";
    valid = false;
  }

  if (!email || !email.includes('@')) {
    document.getElementById("signupEmailError").textContent = "Enter a valid email.";
    valid = false;
  }

  if (pass.length < 6) {
    document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters.";
    valid = false;
  }

  if (!captcha) {
    document.getElementById("captchaError").textContent = "Please verify captcha.";
    valid = false;
  }

  if (valid) {
    // You can optionally show a success message
    successMsg.style.display = "block";
    successMsg.textContent = "Account created successfully!";
    
    // Redirect to dashboard after short delay
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  }

  return false; // Prevent form from submitting normally
}


function validateForgot() {
  let email = document.getElementById("forgotEmail").value;
  let emailError = document.getElementById("forgotEmailError");
  let emailSuccess = document.getElementById("forgotEmailSuccess");

  emailError.textContent = "";
  emailSuccess.textContent = "";

  if (!email || !email.includes('@')) {
    emailError.textContent = "Enter email and try again!";
    return false;
  }

  // ✅ Show green success message
  emailSuccess.textContent = "Recovery email has been sent!";
  return false; // prevent form submission (remove this if using backend)
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

function focusInput() {
  document.getElementById("domainInput").focus();
}

function searchDomain() {
  const input = document.getElementById("domainInput");
  const domain = input.value.trim();
  if (domain === "") return;

  saveToHistory(domain);
  window.location.href = `domain.html?domain=${encodeURIComponent(domain)}`;
}


function saveToHistory(domain) {
  let history = JSON.parse(localStorage.getItem("domainHistory")) || [];
  if (!history.includes(domain)) {
    history.unshift(domain);
    localStorage.setItem("domainHistory", JSON.stringify(history));
  }
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  const history = JSON.parse(localStorage.getItem("domainHistory")) || [];
  list.innerHTML = "";
  history.forEach(domain => {
    const li = document.createElement("li");
    li.textContent = domain;
    li.onclick = () => {
      window.location.href = `domain.html?domain=${encodeURIComponent(domain)}`;
    };
    list.appendChild(li);
  });
}

function filterHistory() {
  const query = document.getElementById("searchHistory").value.toLowerCase();
  const items = document.querySelectorAll("#historyList li");
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? "" : "none";
  });
}

window.onload = renderHistory;


window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const domain = params.get("domain");

  if (domain) {
    document.getElementById("domainName").textContent = domain;
    const now = new Date();
    const timestamp = now.toLocaleDateString("en-GB") + " " + now.toLocaleTimeString("en-GB");
    document.getElementById("timestamp").textContent = timestamp;
  } else {
    document.getElementById("domainName").textContent = "No domain provided";
  }

  const domainInput = document.getElementById("domainInput");
  if (domainInput) {
    domainInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        searchDomain();
      }
    });
  }

  // Optionally render history if the element is present
  if (document.getElementById("historyList")) {
    renderHistory();
  }
};


const form = document.getElementById("ps-form");
const loading = document.getElementById("ps-loading");
const results = document.getElementById("ps-results");

const performanceEl = document.getElementById("ps-performance");
const accessibilityEl = document.getElementById("ps-accessibility");
const bestPracticesEl = document.getElementById("ps-best-practices");
const seoEl = document.getElementById("ps-seo");

const API_KEY = "YOUR_API_KEY"; // Replace with your real API key

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("ps-url").value.trim();
  if (!url) return;

  loading.classList.remove("ps-hidden");
  results.classList.add("ps-hidden");

  try {
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${API_KEY}`
    );
    const data = await res.json();

    const lighthouse = data.lighthouseResult.categories;

    performanceEl.innerHTML = `<h2>Performance</h2><p>${Math.round(
      lighthouse.performance.score * 100
    )}</p>`;
    accessibilityEl.innerHTML = `<h2>Accessibility</h2><p>${Math.round(
      lighthouse.accessibility.score * 100
    )}</p>`;
    bestPracticesEl.innerHTML = `<h2>Best Practices</h2><p>${Math.round(
      lighthouse["best-practices"].score * 100
    )}</p>`;
    seoEl.innerHTML = `<h2>SEO</h2><p>${Math.round(
      lighthouse.seo.score * 100
    )}</p>`;

    loading.classList.add("ps-hidden");
    results.classList.remove("ps-hidden");
  } catch (error) {
    loading.textContent = "Failed to fetch results. Please try again.";
    console.error("PageSpeed error:", error);
  }
});



window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const domain = params.get('domain');
  const nameSpan = document.getElementById('dd-domain-name');

  if (domain && nameSpan) {
    nameSpan.textContent = domain;
  }
});


window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const domain = params.get('domain');
  const domainSpan = document.getElementById('seo-domain-name');

  if (domain && domainSpan) {
    domainSpan.textContent = domain;
  }
});

function toggleContent(id) {
  const el = document.getElementById(id);
  if (el.style.display === 'block') {
    el.style.display = 'none';
  } else {
    el.style.display = 'block';
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const domain = params.get('domain');
  const domainSpan = document.getElementById('geo-domain-name');

  if (domain && domainSpan) {
    domainSpan.textContent = domain;
  }
});


function goToDomainSection(page) {
  const params = new URLSearchParams(window.location.search);
  const domain = params.get("domain");
  if (domain) {
    window.location.href = `${page}?domain=${encodeURIComponent(domain)}`;
  } else {
    alert("No domain selected.");
  }
}

