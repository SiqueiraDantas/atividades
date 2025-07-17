document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar nav a[data-page]");
  const mainContent = document.querySelector(".content");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const page = link.getAttribute("data-page");

      // Remove classe 'active' de todos os links
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Carrega o conteúdo da página na <main>
      fetch(`${page}.html`)
        .then(res => res.text())
        .then(html => {
          mainContent.innerHTML = html;
        })
        .catch(err => {
          mainContent.innerHTML = "<p>Erro ao carregar a página.</p>";
          console.error(err);
        });
    });
  });

  // Adiciona funcionalidade ao botão de logout se existir
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js").then(({ getAuth, signOut }) => {
        const auth = getAuth();
        signOut(auth).then(() => {
          window.location.href = "login.html";
        }).catch((error) => {
          console.error("Erro ao sair:", error.message);
          alert("Erro ao sair: " + error.message);
        });
      });
    });
  }
});
