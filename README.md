# pokemon-api

API feita para um processo seletivo.

Desenvolvida seguindo os padrões do Clean Architecture, proporcionando alta escalabilidade e legibilidade. Destaca-se também o uso de testes unitários e de integração, trazendo segurança no desenvolvimento, tanto no sentido de evitar bugs quanto no sentido de garantir a execuçãod as regras de negócio.

## Requerimentos

Para pode iniciar a API você vai precisar de uma **conexão com o Postgres**, verifique o ```.env.example``` com os valores padrões da conexão que a API faz com o banco. **Se precisar mudar algo, é só criar um .env com os valores que deseja que sejam alterados.**

```
PORT=3333
ENVIRONMENT=local
DATABASE_NAME=pokemon
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_URL=localhost
DATABASE_PORT=5432
INTEGRATION_TEST_DATABASE_NAME=pokemon_test
```

Tendo a conexão estabelecida, **você precisa criar um banco com o nome do** ```DATABASE_NAME``` e, caso queira rodar os testes de integração, também vai precisar criar outra database, **na mesma conexão**, com o nome do ```INTEGRATION_TEST_DATABASE_NAME```

## Setup

Com tudo pronto, basta executar no terminal:

```console
npm install
```

e depois, para rodar as migrations (requer o banco já criado)

```console
npm run migrations:run
```

finalmente

```console
npm run start
```

### Opcional

Vocẽ também pode rodar os testes unitários e de integração

```console
npm run test:unit
```

```console
npm run test:unit:coverage
```

```console
npm run test:integration
```

<sub>```npm run test:integration``` requer a criação de um banco com o nome do ```INTEGRATION_TEST_DATABASE_NAME```</sub>

## Comentários finais

Dado que o projeto era novo e era pra um processo seletivo, decidi estudar algumas coisas novas para aplicar, como:

- ESM ao invés de CommonJS

Se você verificar no ```tsconfig.json``` deste projeto vai notar que o ```module``` está "ES2022" ao invés do comum "CommonJS". Decidi tentar desenvolver o projeto dessa forma para possibilitar o uso de alguns *syntax suggar*, como top-level await (https://v8.dev/features/top-level-await)

Infelizmente foi uma dor de cabeça desde o início (acabou gerando algumas coisas não muito legais, como o script de testes unitários ter que acessar a cli do jest diretamente da ```node_modules```) e não tive nenhum ganho significativo, mas deve ter valido a experiência...

- Novas regras do ESLint

Decidi colocar alguns conjuntos de regras do ESLint mais rigorosos, pra forçar de todas as formas melhores práticas de programação no Typescropt, o resultado foi interessante e acabei mudando uma implementação ou outra.