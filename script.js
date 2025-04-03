function abrirPagina() {
  window.location.href = "inscricao.html";
}

function voltarPagina() {
  window.location.href = "/Html/index.html";
}
function loginPage() {
  window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", function () {
  const trilhas = document.querySelectorAll(".pai-trilha");
  const inscrever = document.querySelector(".increver");

  function verificarScroll() {
    trilhas.forEach((trilha) => {
      const trilhaTop = trilha.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (trilhaTop < windowHeight - 100) {
        trilha.classList.add("show");
      }
    });

    const inscreverTop = inscrever.getBoundingClientRect().top;
    if (inscreverTop < window.innerHeight - 100) {
      inscrever.classList.add("show");
    }
  }

  window.addEventListener("scroll", verificarScroll);
  verificarScroll();
});

// Lógica de seleção única nos checkboxes de trilhas
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".trilha-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        checkboxes.forEach((otherCheckbox) => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
      validarCampos(); // Revalida o formulário após mudança nos checkboxes
    });
  });
});

// Exibir nome do arquivo selecionado
document.addEventListener("DOMContentLoaded", function () {
  function handleFileInputChange(inputId, displayId) {
    const fileInput = document.getElementById(inputId);
    const fileNameDisplay = document.getElementById(displayId);

    fileInput.addEventListener("change", function () {
      if (this.files && this.files.length > 0) {
        fileNameDisplay.textContent = `Arquivo selecionado: ${this.files[0].name}`;
      } else {
        fileNameDisplay.textContent = "";
      }
      validarCampos(); // Revalida o formulário após mudança no arquivo
    });
  }

  handleFileInputChange("file-residencia", "file-residencia-name");
  handleFileInputChange("file-identidade", "file-identidade-name");
});

// Verificação do formulário antes de enviar
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const btnInscricao = document.getElementById("btn-inscricao");
  const modal = document.getElementById("modal-confirmacao");
  const modalContent = document.querySelector(".modal-content p");
  const closeModal = document.querySelector(".close-modal");
  const btnSalvar = document.getElementById("btn-salvar");
  const btnCarregar = document.getElementById("btn-carregar");

  function validarCampos() {
    const camposObrigatorios = document.querySelectorAll(
      "input[required], select[required]"
    );
    const trilhasSelecionadas =
      document.querySelectorAll(".trilha-checkbox:checked").length > 0;

    const termoAssinado =
      document.querySelectorAll(".termo-assing:checked").length > 0;

    const todosPreenchidos = Array.from(camposObrigatorios).every(
      (campo) => campo.value.trim() !== ""
    );

    function validarEmail() {
      const emailInput = document.getElementById("email");
      const erroSpan = document.getElementById("erroEmail");
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regexEmail.test(emailInput.value)) {
        erroSpan.textContent = "E-mail inválido!";
        return false;
      } else {
        erroSpan.textContent = "";
        return true;
      }
    }

    document.getElementById("email").addEventListener("input", validarEmail);

    const senha = document.getElementById("senha");
    const confirmacao = document.getElementById("senha_confirmacao");
    senha.addEventListener("input", senhasIguais);
    confirmacao.addEventListener("input", senhasIguais);

    function senhasIguais() {
      const senhaValue = senha.value;
      const confirmacaoValue = confirmacao.value;
      const spanSenha = document.getElementById("erroSenha");

      if (senhaValue != confirmacaoValue) {
        spanSenha.textContent = "Senhas não são iguais";
        return false;
      } else {
        spanSenha.textContent = "";
        return true;
      }
    }

    function salvarUsusario() {
      // função na pagina de inscrição
      let user = document.getElementById("nome_de_usuario").value;
      let pass = document.getElementById("senha").value;
      let usuario = {
        Usuário: user,
        Senha: pass,
      };
      localStorage.setItem("usuario", JSON.stringify(usuario)); //converte para um arquivo JSON
      alert("Usuário cadastrado com sucesso"); //Validar a sua inscrição
      console.log(usuario);
    }

    const telefoneInput = document.getElementById("telefone");
    telefoneInput.addEventListener("input", validarTelefone);

    function validarTelefone() {
      const telErro = document.getElementById("erroTelefone");
      let telefoneValue = telefoneInput.value;

      telefoneValue = telefoneValue.replace(/\D/g, "");
      telefoneValue = telefoneValue.replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
        "($1) $2 $3-$4"
      );
      telefoneInput.value = telefoneValue;

      if (telefoneValue.length > 14) {
        telErro.textContent = "";
      } else {
        telErro.textContent = "Número de telefone inválido";
      }
    }

    const cpfInput = document.getElementById("cpf");
    cpfInput.addEventListener("input", validarCPf);

    function validarCPf() {
      const cpfErro = document.getElementById("erroCPF");
      let cpfValue = cpfInput.value;

      cpfValue = cpfValue.replace(/\D/g, "");
      cpfValue = cpfValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
      cpfValue = cpfValue;

      cpfInput.value = cpfValue;

      if (cpfValue.length >= 14) {
        cpfErro.textContent = "";
      } else {
        cpfErro.textContent = "Digite um cpf valido";
      }
    }

    const valido =
      todosPreenchidos &&
      trilhasSelecionadas &&
      termoAssinado &&
      validarEmail &&
      senhasIguais &&
      salvarUsusario;
    btnInscricao.disabled = !valido; // Ativa ou desativa o botão de inscrição
    btnCarregar.disabled = !valido;
    btnSalvar.disabled = !valido;
    return valido;
  }

  form.addEventListener("input", validarCampos);
  form.addEventListener("change", validarCampos); // Para os checkboxes e uploads de arquivo

  btnInscricao.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Inscrição realizada com sucesso!";
      modal.style.display = "block";
      form.reset(); // Limpa o formulário
      btnInscricao.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });
  btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Dados Salvos com sucesso!";
      modal.style.display = "block";
      form.reset(); // Limpa o formulário
      btnSalvar.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });

  btnCarregar.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Dados carregados com sucesso!";
      modal.style.display = "block";
      btnCarregar.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
  console.log();
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function preencherLogin() {
  //Função responsavevel por preencher o texto
  let usuarioSalvo = localStorage.getItem("usuario");

  if (usuarioSalvo) {
    let usuario = JSON.parse(usuarioSalvo);
    document.getElementById("nome_de_usuario").value = usuario.nome;
  }
}

function validateLogin() {
  let usernameDigitado = document.getElementById("nome_de_usuario").value;
  let passwordDigitado = document.getElementById("senha").value;
  let usuarioSalvo = localStorage.getItem("usuario");
  let errorUsuariosIguais = document.getElementById("errorUsuariosIguais");
  let errorUsu = document.getElementById("errorusu");

  if (usuarioSalvo) {
    try {
      let usuarioObj = JSON.parse(usuarioSalvo);

      if (usernameDigitado === usuarioObj.usuario) {
        errorUsuariosIguais.textContent = "Este usuário já existe no sistema.";
        errorUsuariosIguais.style.display = "block";
        errorUsu.style.display = "none";
        return false;
      }

      if (
        usernameDigitado === usuarioObj.usuario &&
        passwordDigitado === usuarioObj.senha
      ) {
        errorUsuariosIguais.style.display = "none";
        errorUsu.style.display = "none";
        return true;
      } else {
        errorUsu.textContent = "Nome de usuário ou senha incorretos.";
        errorUsu.style.display = "block";
        errorUsuariosIguais.style.display = "none";
        return false;
      }
    } catch (e) {
      errorUsu.textContent = "Erro ao processar dados do usuário.";
      errorUsu.style.display = "block";
      errorUsuariosIguais.style.display = "none";
      return false;
    }
  } else {
    errorUsu.textContent = "Nenhum usuário encontrado. Cadastre-se primeiro!";
    errorUsu.style.display = "block";
    errorUsuariosIguais.style.display = "none";
    return false;
  }
}

function salvarFormulario() {
  const nome = document.getElementById("nome").value;
  const nomeUsuario = document.getElementById("nome_de_usuario").value;
  const senha = document.getElementById("senha").value;
  const dataNascimento = document.getElementById("data_nascimento").value;
  const cpf = document.getElementById("cpf").value;
  const sexo = document.getElementById("sexo").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const rua = document.getElementById("rua").value;
  const cep = document.getElementById("cep").value;
  const numero = document.getElementById("numero").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const trilhas = Array.from(
    document.querySelectorAll(".trilha-checkbox:checked")
  ).map((checkbox) => checkbox.id);
  const termo = document.getElementById("termo").checked;

  const dadosFormulario = {
    nome: nome,
    nomeUsuario: nomeUsuario,
    senha: senha,
    dataNascimento: dataNascimento,
    cpf: cpf,
    sexo: sexo,
    email: email,
    telefone: telefone,
    rua: rua,
    cep: cep,
    numero: numero,
    cidade: cidade,
    estado: estado,
    trilhas: trilhas,
    termo: termo,
  };

  localStorage.setItem("dadosFormulario", JSON.stringify(dadosFormulario));
  alert("Dados salvos!");
}

function carregarFormulario() {
  const dadosFormularioString = localStorage.getItem("dadosFormulario");

  if (dadosFormularioString) {
    const dadosFormulario = JSON.parse(dadosFormularioString);

    document.getElementById("nome").value = dadosFormulario.nome;
    document.getElementById("nome_de_usuario").value =
      dadosFormulario.nomeUsuario;
    document.getElementById("senha").value = dadosFormulario.senha;
    document.getElementById("data_nascimento").value =
      dadosFormulario.dataNascimento;
    document.getElementById("cpf").value = dadosFormulario.cpf;
    document.getElementById("sexo").value = dadosFormulario.sexo;
    document.getElementById("email").value = dadosFormulario.email;
    document.getElementById("telefone").value = dadosFormulario.telefone;
    document.getElementById("rua").value = dadosFormulario.rua;
    document.getElementById("cep").value = dadosFormulario.cep;
    document.getElementById("numero").value = dadosFormulario.numero;
    document.getElementById("cidade").value = dadosFormulario.cidade;
    document.getElementById("estado").value = dadosFormulario.estado;

    const trilhaCheckboxes = document.querySelectorAll(".trilha-checkbox");
    trilhaCheckboxes.forEach((checkbox) => {
      checkbox.checked = dadosFormulario.trilhas.includes(checkbox.id);
    });

    document.getElementById("termo").checked = dadosFormulario.termo;

    alert("Dados carregados!");
  } else {
    alert("Nenhum dado salvo encontrado.");
  }
}
