import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGWgkGQglB_uuV0eVnU3FuT0kLe8U7vdw",
  authDomain: "mis-educa.firebaseapp.com",
  projectId: "mis-educa",
  storageBucket: "mis-educa.firebasestorage.app",
  messagingSenderId: "432559485193",
  appId: "1:432559485193:web:5c3ad99c601cea0594a3d8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Evento de login
document.getElementById("btnEntrar").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const perfilSelecionado = document.querySelector('input[name="perfil"]:checked');
  const mensagemErro = document.getElementById("mensagemErro");

  if (!email || !senha || !perfilSelecionado) {
    mensagemErro.textContent = "Preencha todos os campos e selecione o perfil.";
    return;
  }

  const perfil = perfilSelecionado.value;

  try {
    // 1. Autenticar
    const cred = await signInWithEmailAndPassword(auth, email, senha);

    // 2. Buscar perfil do usuário no Firestore
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("email", "==", email));
    const resultado = await getDocs(q);

    if (resultado.empty) {
      mensagemErro.textContent = "Usuário não encontrado na base de permissões.";
      return;
    }

    const dados = resultado.docs[0].data();

    if (dados.perfil !== perfil) {
      mensagemErro.textContent = "Perfil selecionado não corresponde ao perfil cadastrado.";
      return;
    }

    // 3. Redirecionar
    if (perfil === "aluno") {
      window.location.href = "aluno/index.html";
    } else if (perfil === "professor") {
      window.location.href = "professor/index.html";
    } else if (perfil === "admin") {
      window.location.href = "admin/index.html";
    }

  } catch (err) {
    console.error(err);
    mensagemErro.textContent = "E-mail ou senha inválidos.";
  }
});
