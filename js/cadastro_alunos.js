import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGWgkGQglB_uuV0eVnU3FuT0kLe8U7vdw",
  authDomain: "mis-educa.firebaseapp.com",
  projectId: "mis-educa",
  storageBucket: "mis-educa.firebasestorage.app",
  messagingSenderId: "432559485193",
  appId: "1:432559485193:web:5c3ad99c601cea0594a3d8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("cadastroAlunoForm");
const mensagemDiv = document.getElementById("mensagemCadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value);
  const cpf = document.getElementById("cpf").value.trim();
  const email = document.getElementById("email").value.trim();

  const checkboxes = document.querySelectorAll('input[name="oficinas"]:checked');
  const oficinasSelecionadas = Array.from(checkboxes).map(cb => cb.value);

  try {
    await addDoc(collection(db, "alunos"), {
      nome,
      idade,
      cpf,
      email,
      oficinas: oficinasSelecionadas,
      criadoEm: new Date()
    });

    mensagemDiv.textContent = "✅ Aluno cadastrado com sucesso!";
    mensagemDiv.style.color = "green";
    form.reset();
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    mensagemDiv.textContent = "❌ Erro ao cadastrar aluno.";
    mensagemDiv.style.color = "red";
  }
});
