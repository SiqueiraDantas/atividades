import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔧 CONFIGURE AQUI SEU FIREBASE:
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SUA_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const container = document.getElementById("notasContainer");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    const q = query(collection(db, "notas"), where("uid", "==", uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      container.innerHTML = "<p>Nenhuma nota registrada ainda.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const nota = doc.data();
      let status = "vermelho";
      if (nota.nota >= 7) status = "verde";
      else if (nota.nota >= 5) status = "amarelo";

      const div = document.createElement("div");
      div.className = "linha-nota";

      div.innerHTML = `
        <div class="info">
          <h3>${nota.disciplina}</h3>
          <p><strong>Professor:</strong> ${nota.professor}</p>
        </div>
        <div class="nota ${status}">${nota.nota.toFixed(1)}</div>
        <button onclick="verDetalhes('${nota.disciplina}')">Ver Detalhes</button>
      `;
      container.appendChild(div);
    });

  } else {
    window.location.href = "login.html"; // redireciona se não estiver logado
  }
});

window.verDetalhes = function(disciplina) {
  alert(`Exibir detalhes da disciplina: ${disciplina}`);
};
