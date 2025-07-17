import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔐 CONFIGURAÇÃO DO FIREBASE (substituir pelos seus dados reais)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const lista = document.getElementById("listaDisciplinas");

async function carregarDisciplinas() {
  lista.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "disciplinas"));
    querySnapshot.forEach((doc) => {
      const d = doc.data();

      const card = document.createElement("div");
      card.className = "card-disciplina";

      card.innerHTML = `
        <img src="${d.imagem}" alt="${d.nome}">
        <div class="card-conteudo">
          <h3>${d.nome}</h3>
          <p><strong>Professor:</strong> ${d.professor}</p>
          <p><strong>Dias:</strong> ${d.dias}</p>
          <p><strong>Horário:</strong> ${d.horario}</p>
          <p><strong>Objetivo:</strong> ${d.objetivo}</p>
          <button onclick="verMais('${d.nome}')">Ver Mais</button>
        </div>
      `;

      lista.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar disciplinas:", error);
    lista.innerHTML = "<p>Erro ao carregar disciplinas.</p>";
  }
}

// função temporária
window.verMais = function (nome) {
  alert(`Mais detalhes sobre: ${nome}`);
};

document.addEventListener("DOMContentLoaded", carregarDisciplinas);
