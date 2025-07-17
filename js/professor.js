// Verifica se o usuário está autenticado
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html"; // Redireciona se não estiver logado
  } else {
    // Recupera o tipo de usuário salvo no sessionStorage
    const tipoUsuario = sessionStorage.getItem("tipoUsuario");

    if (tipoUsuario !== "professor") {
      window.location.href = "index.html"; // Bloqueia se não for professor
    }
  }
});

// Logout do sistema
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      firebase.auth().signOut().then(() => {
        sessionStorage.clear();
        window.location.href = "index.html";
      });
    });
  }
});
