const API = "http://localhost:4000/api/auth/register";


export async function register(usuario) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (!res.ok) {
      throw new Error("error registering a user");
    }

    const nuevoUsuario = await res.json();

    // Guardar en localStorage para mantener la sesión
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

    return nuevoUsuario;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}



const form = document.getElementById("registroForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.nombre.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!name || !email || !password) {
    alert("complete the fields");
    return;
  }

  const newUser = { name, email, password };

  try {
    const res = await register(newUser);
    alert("user created successfully");

    window.location.href = "/src/views/login.html";
  } catch (error) {
    alert("Error register");
    console.error(error);
  }
});
