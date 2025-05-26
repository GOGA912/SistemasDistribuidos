document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const cuenta = document.getElementById("cuenta").value.trim();
  const nip = parseInt(document.getElementById("nip").value);
  const mensaje = document.getElementById("mensaje");

  console.log("Enviando:", { numero: cuenta, nip: nip });

  fetch("https://29f7-130-131-81-210.ngrok-free.app/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ numero: cuenta, nip: nip })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error de red o respuesta inválida");
      }
      return response.json();
    })
    .then(data => {
      console.log("Respuesta recibida:", data);
      if (data.mensaje && data.mensaje.toLowerCase().includes("exitosa")) {
        localStorage.setItem("cuentaActiva", cuenta);
        localStorage.setItem("nombreActivo", data.nombre);
        localStorage.setItem("sexoActivo", data.sexo);
        window.location.href = "html/dashboard.html";
      } else {
        mensaje.textContent = "Error: " + (data.mensaje || "Autenticación fallida");
      }
    })
    .catch(error => {
      mensaje.textContent = "Error de conexión: " + error.message;
      console.error("Error:", error);
    });
});
