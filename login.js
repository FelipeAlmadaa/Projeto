function salvarUsusario(){ // função na pagina de inscrição 
    let user = document.getElementById('nome_de_usuario').value;
    let pass = document.getElementById('senha').value;
    let usuario = {
        Usuário: user,
        Senha: pass
    };
    localStorage.setItem("usuario",JSON.stringify(usuario));//converte para um arquivo JSON
        alert("Usuário cadastrado com sucesso")//Validar a sua inscrição 
}
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

        if (usernameDigitado === usuarioObj.username && passwordDigitado === usuarioObj.password) {
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


