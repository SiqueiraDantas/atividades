document.getElementById('upload-foto').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      document.getElementById('avatar').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('formPerfil').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const senha = document.getElementById('senha').value;
  const confirmaSenha = document.getElementById('confirmaSenha').value;

  if (senha && senha !== confirmaSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  alert("Perfil atualizado com sucesso!");
  document.getElementById('senha').value = '';
  document.getElementById('confirmaSenha').value = '';
});
