document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("listaAtividades");

  // Recupera atividades cadastradas via cadastro_atividades
  const atividadesSalvas = JSON.parse(localStorage.getItem("atividades")) || [];

  const statusTexto = {
    "entregue": "Entregue",
    "pendente": "Pendente",
    "nao-concluida": "Não Concluída"
  };

  if (atividadesSalvas.length === 0) {
    lista.innerHTML = "<p style='font-size: 16px; color: #555;'>Nenhuma atividade cadastrada até o momento.</p>";
    return;
  }

  atividadesSalvas.forEach(atividade => {
    const card = document.createElement("div");
    card.className = "card-atividade";

    card.innerHTML = `
      <img src="${atividade.imagem}" alt="${atividade.titulo}" onerror="this.src='../assets/placeholder.jpg'">
      <h3>${atividade.titulo}</h3>
      <span class="status ${atividade.status}">${statusTexto[atividade.status]}</span>
      <button onclick="comecarAtividade('${atividade.titulo}')">Começar Atividade</button>
    `;

    lista.appendChild(card);
  });
});

function comecarAtividade(titulo) {
  alert(`Iniciando a atividade: ${titulo}`);
  // Aqui você pode redirecionar para uma página específica no futuro
  // window.location.href = `atividade.html?titulo=${encodeURIComponent(titulo)}`;
}
