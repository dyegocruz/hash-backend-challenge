
 ## Requisitos

Para esse projeto é necessário instalar o node versão 16.13.0 - https://nodejs.org/en/download
 

## Instalação
```bash

$ npm install

```

## Rodando a aplicação

```bash
# watch/dev mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker-compose mode
$ docker-compose up -d --build
```

## Ações

```bash
# checkout do carrinho
$ curl --location --request POST 'http://localhost:3000/cart/checkout' \
--header 'Content-Type: application/json' \
--data-raw '{
    "products": [
        {
            "id": 1,
            "quantity": 2
        },
        {
            "id": 3,
            "quantity": 2
        }
    ]
}'

# listar produtos
$ curl --location --request GET 'localhost:3000/product'
```

## Test

```bash

# unit tests
$ npm run test


# e2e tests
$ npm run test:e2e


# test coverage
$ npm run test:cov

```

## Decisões tomadas

- Decidi utilizar o Nestjs como framework para facilitar e agilizar o desenvolvimento.
- Para documentar a aplicação decidir por utulizar o swagger, que pode ser acessado na url http://localhost:3000/api.
- Optei por utilizar o conteúdo do arquivo products.json como se fôsse uma fonte de dados proveniente de um arquivo ".ts" para facilitar o desenvolvimento.

## Contato

- Author - [Dyego Cruz](https://github.com/dyegocruz)  