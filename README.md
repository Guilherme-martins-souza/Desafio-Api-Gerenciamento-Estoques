# Desafio Gerenciamento de estoque 👋

> API de gerenciamento de estoque em NODEJS com NESTJS e Autenticação JWT.

## Install

```
npm install.
```

## Usage

```
npm run start:dev.
```

## How to test/use

```
1 Primeiro, configurando banco de dados.
  
  Configure as seguintes credências em um .env, para que a API acesse seu banco de dados.
    JWT_SECRET_KEY=
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=
    
    obs: 1 Caso não esteja utilizando o postgres você precisa trocar o "type:" em app.module.ts.
         2 Você pode criar uma secret key utilizando o comando "openssl rand -base64 32".
  ```
  ```
  2 Segundo, recebendo um token.
  
    A API basicamente consiste em 5 módulos sendo eles; auth, users, estoque, produto e produto_estoque. Para criarmos um produto, 
    estoque ou produto_estoque primeiramente precisamos criar uma conta em users e logar com o auth, para assim recebermos um token.
    
    A partir de uma requisição de um cliente http como o Insomnia, você pode estar criando uma user com a chamada post e endereço 
    "localhost:3000/api/v1/users" também vai precisar passar quatro parâmetros em json sendo eles; "firstname": "string", "lastname": 
    "string", "email": "string", "password": "string".
    
    Exemplo:  
    {
      "firstName": "carlos",
      "lastName": "joão",
      "email": "carlosjoao@gmail.com",
      "password": "Carlos_123@"
    }
    
    Agora utilizando o email e password como parâmetros, você pode receber seu token a partir de uma chamada post ao endereço
    "localhost:3000/api/auth/login" você irá precisar de um arquivo json e passar seu "email" e "senha" da seguinte forma. 
    
    Exemplo:
    {
      "email": "carlosjoao@gmail.com",
      "password": "Carlos_123@"
    }
    
    Então você receberá seu token, ele está configurado para durar 8 minutos.
    ```
    ```
  3 Terceiro, criando um produto_estoque.
  
    Agora que você já tem seu token, a partir de um Header com nome "Authorization" a valor "Bearer "seu_token_aqui"", você
    pode criar seus produtos e estoques e juntar os dois em um produto_estoque.
    
    Comece criando um produto. Chamada "POST" , endereço "localhost:3000/api/v1/produtos" e parâmetro "produto": "string".
     Exemplo: {
              "produto": "arroz"
              }
              
    Depois crie um estoque, Chamada "POST" , endereço "localhost:3000/api/v1/estoques" e parâmetro "estoque": "string".
     Exemplo: {
              "nomeEstoque": "estoque de porto alegre"
              }
              
    Agora com o ids de produto e estoque que você criou, você pode criar seu produto_estoque, Chamada "POST", endereço
    "localhost:3000/api/v1/produto-estoque" , parâmetros "produto": "id_do_produto", "estoque": "id_do_estoque",
    "quantidade": number .
      Exemplo:{
              "produto": "c1a53cb8-679b-4f08-81fe-186fcea8544e",
              "estoque": "bf1c33f5-66d5-492b-8e99-d9d0e8ed43c3",
              "quantidade": 8
              } 
              
    Você pode ver uma lista dos produto_estoque que existem fazendo uma chamada "GET" no endereço api/v1/produto-estoque .           
  ```
  ```
  4 Quarto, Módulos e suas chamadas.
  
     1/5 Users.
      Index : Mostra todos os users
        GET localhost:3000/api/v1/users
        
      Show : Mostra informações sobre um user em específico.
        GET localhost:3000/api/v1/users/id_user_desejado
        
      Create : Criar conta.
        POST localhost:3000/api/v1/users
        parâmetros obrigatórios: {firstName": "carlos","lastName": "String","email": "String", "password": "String"}
            
      Update : Atualizar conta.
        PUT localhost:3000/api/v1/users/id_user_desejado
        parâmetros opcionais: { firstName": "String", 	"lastName": "String", "password": "String" }
      
      Destroy
        DEL localhost:3000/api/v1/users/id_user_desejado
     
     2/5 Auth.
      Login: logar para obter token.
        POST localhost:3000/api/auth/login
        parâmetros obrigatórios {"email": "String", "password": "String"}
        
     
     3/5 Produto_estoque.
      Index: Mostra todos os Produto_estoques.
        GET localhost:3000/api/v1/produto-estoque
        
      Show 
        GET localhost:3000/api/v1/produto-estoque/id_do_produto_estoque_desejado
        
      GetHistory
        GET localhost:3000/api/v1/produto-estoque/history
        
      Create
        POST localhost:3000/api/v1/produto-estoque
        parâmetro obrigatório{"produto": "id_produto","estoque": "id_estoque", "quantidade": number} 
        
      Update 
        PUT localhost:3000/api/v1/produto-estoque/id_do_produto_estoque_desejado
        parâmetro obrigatório{"quantidade": number }
        
      Destroy 
        DEL localhost:3000/api/v1/produto-estoque/id_do_produto_estoque_desejado
        
     4/5 Produto.
      Index: Mostra todos os Produto.
        GET localhost:3000/api/v1/produtos/
        
      Show: Mostra um produto em específico:
        GET http://localhost:3000/api/v1/produtos/
        
      GetHistory: Mostra produtos deletados.
        GET http://localhost:3000/api/v1/produtos/history
        
      Create: Cria um produto.
        POST localhost:3000/api/v1/produtos
        parâmetro obrigatório{"produto": "string" }
        
      Update
        PUT localhost:3000/api/v1/produtos/id_desejado
        parâmetro obrigatório{"produto": "string" }
        
      Destroy: Deleta produto do front.
        DEL localhost:3000/api/v1/produtos/id_desejado
        
     5/5 Estoque.
      Index: Mostra todos os estoques;
        GET localhost:3000/api/v1/estoques
        
      Show: Mostra estoque específico.
        GET localhost:3000/api/v1/estoques/id_desejado
        
      GetHistory: Mostra estoques deletados.
        GET localhost:3000/api/v1/estoques/history
        
      Create: Cria um estoque.
        POST localhost:3000/api/v1/estoques
        parâmetro obrigatório{"nomeEstoque": "string" }
        
      Update: Atualiza nomeEstoque.
        PUT localhost:3000/api/v1/estoques/id_desejado
         parâmetro obrigatório{"nomeEstoque": "string" }
         
      Destroy: Deleta estoque do front.
        DEL localhost:3000/api/v1/estoques/id_desejado

```

## Author

👤 **Guilherme Martins**

- Github: [@Guilherme Martins Souza](https://github.com/Guilherme-martins-souza)
- Linkedin: [Guilherme Martins Souza](https://www.linkedin.com/in/guilherme-martins-souza-21a77822b/)
