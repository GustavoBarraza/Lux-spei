import { getUsers } from "./api";
const IniciarSesion = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Por favor, complete todos los campos.");
        return;
    } else {
        try {
            const users = await getUsers();
            const user = users.find(u => u.email.trim() === email && u.password.trim() === password);
            if (user) {
                window.location.hash = "/dashboard";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            alert("Error al conectar con el servidor.");
        }
    }
}

export { IniciarSesion };