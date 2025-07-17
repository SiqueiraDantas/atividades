document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("listaCertificados");

  // Aqui no futuro virão os dados via backend ou localStorage
  const certificados = JSON.parse(localStorage.getItem("certificadosAluno")) || [];

  const statusTexto = {
    "emitido": "Emitido",
    "pendente": "Aguardando",
    "cancelado": "Cancelado"
  };

  if (certificados.length === 0) {
    lista.innerHTML = `
      <p style="font-size: 16px; color: #555;">
        Nenhum certificado disponível no momento.<br>
        Assim que um certificado for enviado pela coordenação, ele aparecerá aqui.
      </p>`;
    return;
  }

  certificados.forEach(cert => {
    const card = document.createElement("div");
    card.className = "card-certificado";

    card.innerHTML = `
      <h3>${cert.titulo}</h3>
      <div class="info">📅 ${cert.data} &nbsp;&nbsp; | 🏷️ ${cert.tipo}</div>
      <span class="status ${cert.status}">${statusTexto[cert.status]}</span>
      <div class="botoes">
        <button class="btn-ver" onclick="visualizarCertificado('${cert.link}')">👁️ Ver</button>
        <button class="btn-download" onclick="baixarCertificado('${cert.link}')">⬇️ Baixar</button>
      </div>
    `;

    lista.appendChild(card);
  });
});

function visualizarCertificado(link) {
  if (link && link !== "#") {
    window.open(link, "_blank");
  } else {
    alert("Este certificado ainda não está disponível para visualização.");
  }
}

function baixarCertificado(link) {
  if (link && link !== "#") {
    window.open(link, "_blank");
  } else {
    alert("Este certificado ainda não está disponível para download.");
  }
}
