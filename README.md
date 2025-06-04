Cadastro Usuario

Descrição

Este é um projeto frontend desenvolvido em Angular para gerenciamento de usuários. O sistema possui 4 telas principais: Login, Registro, Home e Atualizar Dados. O objetivo da aplicação é permitir que o usuário faça login, cadastre-se, visualize seus dados, veja a lista de usuários, exclua sua conta e atualize seus dados. Os dados dos usuários são compostos por nome, email e senha.


Tecnologias Utilizadas

- Angular (Standalone Components)
- SCSS para estilos
- FontAwesome para ícones
- Angular Reactive Forms para formulários reativos


Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 14 ou superior recomendada)
- Angular CLI (instalado globalmente)
  
  Para instalar o Angular CLI globalmente, execute:
  npm install -g @angular/cli

---

Como instalar e rodar o projeto

1. Clone este repositório:
   git clone https://github.com/izabella-bl/Cadastro-Usuario-Frontend.git
2. Entre na pasta do projeto:
   cd cadastro-usuario
3. Instale as dependências:
   npm install
4. Para rodar a aplicação em modo de desenvolvimento:
   ng serve --open

A aplicação será aberta automaticamente no navegador em http://localhost:4200.

---

Estrutura do projeto

- Login: Tela para o usuário acessar o sistema.
  <div align="left">
     <img src="https://github.com/user-attachments/assets/4423f650-2ebb-49a8-86eb-7927bc26d0ea" width="700px" />
  </div>

- Registro: Tela para o usuário criar uma nova conta.
  <div align="left">
     <img src="https://github.com/user-attachments/assets/e5b5676d-c1c5-4363-a072-b0d2561294ff" width="700px" />
  </div>
  
- Home: Tela principal onde o usuário visualiza seus dados e a lista de usuários.
  <div align="left">
     <img src="https://github.com/user-attachments/assets/f0a3f5db-ead7-412a-b24f-a45184879a07" width="700px" />
  </div>
  
- Atualizar Dados: Tela para o usuário atualizar suas informações pessoais.
  <div align="left">
     <img src="https://github.com/user-attachments/assets/2934b204-710a-4da3-89de-9800ee4a9f36" width="700px" />
  </div>

---

Funcionalidades

- Login: Autenticação do usuário.
- Registro: Cadastro de novos usuários com nome, email e senha.
- Visualização de dados: O usuário pode ver seus dados pessoais.
- Lista de usuários: Exibe a lista de usuários cadastrados.
- Excluir conta: O usuário pode excluir sua própria conta.
- Atualizar dados: O usuário pode atualizar nome, email e senha.

---

Estilos e bibliotecas adicionais

- Estilos escritos em SCSS.
- Ícones usados da biblioteca FontAwesome.

---

Build para produção

Para gerar uma build otimizada para produção, execute:

ng build --configuration production

Os arquivos gerados ficarão na pasta dist/cadastro-usuario.

---

Contato

Em caso de dúvidas ou sugestões, abra uma issue no repositório.

---

Projeto criado com Angular CLI.
