# Sobre a aplicação

Esta API se trata de um simples servidor CRUD desenvolvido em **Node.js, Express.js e PostgreSQL**, com ajuda do ORM Prisma para facilitar a comunicação entre a api e database. Além disso foram utilizados o **Tsyringe** para criar injetar as dependências, **jest e supertes**t para implementação de testes unitários e End-to-End (E2E) e do **Docker** para criar todo o ambiente virtual.

# Regras de negócio

A aplicação funciona em torno de um único módulo de "tarefas", este que possuí 4 (quatro) serviços, ou também chamados de casos de uso, representando as quatro rotas de um CRUD convencional (_Create, Read, Update e Delete_). Além disso, a aplicação utiliza de um modelo estruturado no Prisma, chamada de _Task_. Este modelo fundamental possuí quatro estados pré-estabelecidos que podem ser utilizados por uma aplicação front de Kanban, estes que são _"PENDING"_ (Pendente), _"DOING"_ (Fazendo), _"REVIEW"_ (Revisão), _"DONE"_ (Feito).

Formato de um objeto _Task_:

```javascript
{
  id: String,
  title: String,
  status: TaskStatus,
  content: String,
  createdAt: Date,
  updatedAt: Date
}

type TaskStatus = "PENDING" | "DOING" | "REVIEW" | "DONE";
```

Exemplo de um objeto _Task_:

```javascript
{
  id: "a8758788-15ba-4220-86ff-7516c5804cf1",
  title: "Título da tarefa",
  status: "PENDING",
  content: "Conteúdo da tarefa",
  createdAt: "2023-02-13T04:44:13.763Z",
  updatedAt: "2023-02-13T04:44:13.831Z"
}
```

Foram consideradas as seguintes regras de negócio para desenvolver a aplicação:

_Create:_

- Deve ser possível criar uma nova tarefa;
- Deve ser possível criar uma nova tarefa mesmo sem a informação de _"status"_ e _"content"_;
- Não deve ser possível criar uma nova tarefa sem a informação de _"title"_.

_Read:_

- Deve ser possível visualizar todas as tarefas corretamente criadas.

_Update:_

- Deve ser possível atualizar uma tarefa existente;
- Não deve ser possível atualizar uma tarefa que não existe;
- Não deve ser possível atualizar uma tarefa com um status que não seja uma das quatro pré-definidas;
- Não deve ser possível atualizar o título para que fique vazio

_Delete:_

- Deve ser possível deletar uma tarefa existente;
- Não deve ser possível deletar uma tarefa que não existe.

# Como utilizar

Pré-requisitos:

- Node v16.17.1 ou superior
- Docker v20.10.17 ou superior
- Docker-compose v2.6.1 ou superior

**OBS: É possível que em outras versões mais antigas a aplicação continue funcionando normalmente, mas o ideal seria utilizar as versões citadas acima.**

Primeiro deve-se criar uma cópia do arquivo `.env.example`, dentro já haverá a `DATABASE_URL` do prisma que está com os valores registrados no `docker-compose.yml`, então é possível também apenas apagar a extensão `.example` do final do arquivo caso preferir, apesar de não ser o recomendado.

Lembrando que caso queira testar a aplicação um outro banco de dados, é preciso se atentar para as credenciais no arquivo `.env.example` e também em apagar a database que será criada no arquivo `docker-compose.yml` ao montar o container.

Instale as dependências utilizando:

```bash
yarn
```

ou:

```bash
npm install
```

Em seguida monte a aplicação e a database usando o comando:

```bash
docker-compose up -d
```

O arquivo `docker-compose.yml` automaticamente ativa o comando para subir o servidor em desenvolvimento, caso queira ver o status do mesmo pode usar o comando:

```bash
docker logs kanban-server
```

ou:

```bash
docker logs kanban-server -f #Para visualizar atualizações em tempo real
```

Para a aplicação funcionar, é necessário que o Prisma realize as migrações e também que o docker reinicie seu servidor para restabelecer a conexão:

```bash
docker exec -it kanban-server npx prisma migrate dev && docker-compose restart
```

ou caso esteja utilizando git bash:

```bash
(docker exec -it kanban-server npx prisma migrate dev) -and (docker-compose restart)
```

É possível também rodar os testes implementados (unitários e E2E) usando o comando:

```bash
docker exec -it kanban-server npm run test
```

Caso queira, também é possível testar manualmente a aplicação usando as rotas:

- "http://localhost:3333/api/v1/tasks" - POST
- "http://localhost:3333/api/v1/tasks/all" - GET
- "http://localhost:3333/api/v1/tasks/:id" - UPDATE
- "http://localhost:3333/api/v1/tasks/:id" - DELETE
