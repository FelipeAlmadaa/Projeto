function abrirPagina() {
  window.location.href = "inscricao.html";
}

function voltarPagina() {
  window.location.href = "index.html";
}
function loginPage(){
  window.location.href = "login.html"
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

  function validarCampos() {
    const camposObrigatorios = document.querySelectorAll(
      "input[required], select[required]"
    );
    const trilhasSelecionadas =
      document.querySelectorAll(".trilha-checkbox:checked").length > 0;
    
    const termoAssinado = 
      document.querySelectorAll(".termo-assing:checked").length >0;

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
    const confirmacao =document.getElementById("senha_confirmacao");
    senha.addEventListener("input", senhasIguais);
    confirmacao.addEventListener("input", senhasIguais);

    function senhasIguais(){
      const senhaValue = senha.value
      const confirmacaoValue = confirmacao.value
      const spanSenha = document.getElementById("erroSenha");
      
      
      if (senhaValue != confirmacaoValue ){
        spanSenha.textContent = "Senhas não são iguais";
        return false;
      } else {
        spanSenha.textContent = "";
        return true;
      }
  
    }

    function salvarUsusario(){ // função na pagina de inscrição 
      let user = document.getElementById('nome_de_usuario').value;
      let pass = document.getElementById('senha').value;
      let usuario = {
          Usuário: user,
          Senha: pass
      };
      localStorage.setItem("usuario",JSON.stringify(usuario));//converte para um arquivo JSON
          alert("Usuário cadastrado com sucesso")//Validar a sua inscrição 
      console.log(usuario)
    }
  

    const valido = todosPreenchidos && trilhasSelecionadas && termoAssinado && validarEmail && senhasIguais && salvarUsusario ;
    btnInscricao.disabled = !valido; // Ativa ou desativa o botão de inscrição
    return valido;
  }

  form.addEventListener("input", validarCampos);
  form.addEventListener("change", validarCampos); // Para os checkboxes e uploads de arquivo

  btnInscricao.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Inscrição realizada com sucesso!" ;
      modal.style.display = "block";
      form.reset(); // Limpa o formulário
      btnInscricao.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
console.log()
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

//validações para a pagina de login
  function preencherLogin() { //Função responsavevel por preencher o texto 
    let usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
        let usuario = JSON.parse(usuarioSalvo); // Convertendo de volta para objeto
        document.getElementById("nome_de_usuario").value = usuario.nome; // Preenchendo o campo comm as informações de login
    }
  }

  function validateLogin() {
    let usernameDigitado = document.getElementById("nome_de_usuario").value;
    let passwordDigitado = document.getElementById("senha").value;

    let usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
        let usuarioObj = JSON.parse(usuarioSalvo); // Converte de JSON para objeto
        
        if (usernameDigitado === usuarioObj.Usuário && passwordDigitado === usuarioObj.Senha) {
            alert("Login bem-sucedido!");
            return true; // Permite o envio do formulário
        } else {
            document.getElementById("error-message").style.display = "block"; // Exibe a mensagem de erro
            return false; // Impede o envio do formulário
        }
    } else {
        document.getElementById("error-message").textContent = "Nenhum Usuario encontrado. Cadastre -se primeiro!";
        document.getElementById("error-message").style.display = "block";
        return false; // Impede o envio do formulário
    }
  }
