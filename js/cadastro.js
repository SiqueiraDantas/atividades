import { db, storage, auth } from "../firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("formProfessor");
  const lista = document.getElementById("listaProfessores");
  const fotoInput = document.getElementById("fotoInput");
  const previewFoto = document.getElementById("previewFoto");

  let fotoFile = null;

  fotoInput.addEventListener("change", () => {
    fotoFile = fotoInput.files[0];
    if (fotoFile) {
      previewFoto.src = URL.createObjectURL(fotoFile);
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomeProf").value;
    const email = document.getElementById("emailProf").value;
    const senha = document.getElementById("senhaProf").value;
    const confirmarSenha = document.getElementById("confirmarSenhaProf").value;
    const telefone = document.getElementById("telefoneProf").value;
    const disciplina = document.getElementById("disciplinaProf").value;

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);

      let urlFoto = "../assets/avatar_prof.png";
      if (fotoFile) {
        const storageRef = ref(storage, `professores/${Date.now()}_${fotoFile.name}`);
        await uploadBytes(storageRef, fotoFile);
        urlFoto = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "professores"), {
        nome,
        email,
        telefone,
        disciplina,
        foto: urlFoto
      });

      alert("Professor cadastrado com sucesso!");
      form.reset();
      previewFoto.src = "../assets/avatar_prof.png";
      fotoFile = null;
      carregarProfessores();

    } catch (error) {
      console.error("Erro ao cadastrar professor:", error.message);
      alert("Erro ao cadastrar: " + error.message);
    }
  });

  async function carregarProfessores() {
    lista.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "professores"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const card = document.createElement("li");
      card.className = "card-professor";
      card.innerHTML = `
        <img src="${data.foto}" alt="${data.nome}">
        <div class="info-professor">
          <strong>${data.nome}</strong>
          <span>Disciplina: ${data.disciplina}</span>
          <span>Email: ${data.email}</span>
          <span>Telefone: ${data.telefone}</span>
        </div>
      `;
      lista.appendChild(card);
    });
  }

  carregarProfessores();
});
