const IniciarSesion = () => {
    // Tomamos los valores aquí dentro para que se obtengan al momento de llamar a la función
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }


}
