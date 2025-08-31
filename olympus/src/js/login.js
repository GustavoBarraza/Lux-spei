// src/js/login.js
const API = "http://localhost:4000/api/auth/login";

// Login function
async function login(user) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json(); // read JSON only once

    if (!res.ok) {
      throw new Error(data.message || "Invalid credentials");
    }

    // Save token and user in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
}

// Form capture
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await login({ email, password });
      alert("Login successful!");

      // Redirect to dashboard
      window.location.href = "/src/views/dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });
});
