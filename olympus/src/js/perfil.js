// =============================
// Load profile on page load
// =============================

  document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:4000/api/user/profile", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch profile");

    const profile = await res.json();
    document.getElementById("nombreUsuario").textContent = profile.name;
    document.getElementById("email").innerHTML = `<strong>Email:</strong> ${profile.email}`;
  } catch (error) {
    console.error(error);
    alert("Profile could not be loaded. Please login again.");
    window.location.href = "./login.html";
  }
});


// =============================
// Logout button
// =============================
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "./login.html";
  });
}

// =============================
// Edit profile modal
// =============================
const modal = document.getElementById("modalEditarPerfil");
const btnEdit = document.getElementById("editar-perfil");
const btnSave = document.getElementById("guardarCambios");
const btnCancel = document.getElementById("cancelarEdicion");

if (btnEdit) {
  btnEdit.addEventListener("click", () => {
    document.getElementById("editName").value = document.getElementById("nombreUsuario").textContent;
    document.getElementById("editEmail").value = document.getElementById("email").textContent.replace("Email:", "").trim();
    document.getElementById("editPassword").value = "";
    modal.classList.remove("hidden");
  });
}

if (btnCancel) {
  btnCancel.addEventListener("click", () => modal.classList.add("hidden"));
}

if (btnSave) {
  btnSave.addEventListener("click", async () => {
    const newName = document.getElementById("editName").value;
    const newEmail = document.getElementById("editEmail").value;
    const newPassword = document.getElementById("editPassword").value;

    try {
      const res = await fetch(`http://localhost:4000/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error updating profile");

      alert("Profile updated successfully");
      document.getElementById("nombreUsuario").textContent = newName;
      document.getElementById("email").innerHTML = `<strong>Email:</strong> ${newEmail}`;
      modal.classList.add("hidden");
    } catch (error) {
      alert(error.message);
    }
  });
}

// =============================
// Avatar upload with localStorage
// =============================
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview");

if (avatarPreview) {
  const savedImage = localStorage.getItem("avatarUsuario");
  if (savedImage) avatarPreview.src = savedImage;
}

if (avatarInput) {
  avatarInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
        localStorage.setItem("avatarUsuario", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
}

// =============================
// Goal Form Submission
// =============================
const goalForm = document.getElementById("goalForm");

if (goalForm) {
  goalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("goalTitle").value;
    const description = document.getElementById("goalDescription").value;
    const distance = document.getElementById("goalDistance").value;
    const duration = document.getElementById("goalDuration").value;
    const date = document.getElementById("goalDate").value;
    const goalTypeName = document.getElementById("goalType").value;

    try {
      const res = await fetch("http://localhost:4000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          description,
          target_distance: distance,
          target_duration: duration,
          target_date: date,
          goal_type_name: goalTypeName
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error creating goal");

      alert("Goal created ✅");
      goalForm.reset();
    } catch (error) {
      alert(error.message);
    }
    console.log(res.status, res.statusText); // Verifica el status
    const text = await res.text(); // Muestra lo que realmente devuelve el servidor
    console.log(text);
  });
}
