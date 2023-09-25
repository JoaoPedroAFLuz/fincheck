# 💸 API do fincheck

REST API desenvolvida em [Node.js](https://nodejs.org/) utilizando o framework [NestJS](https://nestjs.com/). Foram utilizados também: 
e tecnologias: 
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- JWT
- Princípios SOLID
- Clean Code
- Entre outros...

API disponibilizada em: https://fincheck-api-b7ug.onrender.com

Arquivo do [Insomnia](https://insomnia.rest/) com exemplos de rotas para ser importado no aplicativo: [insomnia.json](https://github.com/JoaoPedroAFLuz/fincheck/blob/main/api/insomnia.json)

## ⚙ Instalação
Caso queria instalar a API, basta seguir os seguintes passos:

- Clone o repositório com o comando:

``` bash
git clone https://github.com/JoaoPedroAFLuz/fincheck
```

- Acesse a pasta da API:
```bash
cd api
```

- Instale as dependências: 
```bash
yarn
```

## 🚀 Inicialização
Requisitos:
- URL de conexão para um banco [Postgres](https://www.postgresql.org/)
- Arquivo .env com base no [.env.example](https://github.com/JoaoPedroAFLuz/fincheck/blob/main/api/.env.example) fornecido. Nele você irá precisar adicionar a URL do banco Postgres, uma chave quer irá servir como a JWT Secret e caso queira rodar a aplicação em uma porta diferente da 3000, você poderá estar adicionando-a nesse arquivo.


Primeira inicialização
- Execute o seguinte comando para rodar as migrations em ambiente de desenvolvimento:
```bash
yarn prisma migrate dev
```

Inicializar aplicação
- Execute o comando abaixo para rodar a aplicação em desenvolvimento:
```bash
yarn start:dev
```

Após isso a aplicação estará rodando em localhost:3000 (ou na porta informada).
No terminal é possível ver quais são as rotas mapeadas pela aplicação e caso queira poderá importar o arquivo [insomnia.json](https://github.com/JoaoPedroAFLuz/fincheck/blob/main/api/insomnia.json) no aplicativo [Insomnia](https://insomnia.rest/). Nele você terá exemplos de como executar cada uma das funcionalidades da aplicação.

## Entidades e funcionalidades implementadas:

### Autenticação
- [x] Criar novo usuário
- [x] Login

### Usuários
- [x] Buscar informações do usuário logado

### Contas bancárias
- [x] Buscar todas do usuário logado
- [x] Buscar conta do usuário logado pelo id da conta
- [x] Criar conta bancária
- [x] Atualizar conta bancária
- [x] Deletar conta bancária

### Categorias
- [x] Buscar todas
- [x] Buscar categoria pelo id
- [x] Criar categoria
- [x] Atualizar categoria
- [x] Deletar categoria

### Transações
- [x] Buscar todas
- [x] Buscar transação pelo id
- [x] Criar transação
- [x] Atualizar transação
- [x] Deletar transação