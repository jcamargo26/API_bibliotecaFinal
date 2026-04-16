# API REST - CRUD Completo de Livros

API REST desenvolvida em Node.js com Express para gerenciamento de livros. Permite criar, listar, atualizar e deletar registros, com validações e tratamento de erros em todos os endpoints.

---

## Tecnologias

- **Node.js**
- **Express**
- **Postman**

---

## Como executar

**Pré-requisitos:** Node.js v14 ou superior e npm instalados.

```bash
# Clone o repositório
git clone https://github.com/jcamargo26/apiRest-CRUDCOMPLETO.git

cd apiRest-CRUDCOMPLETO

npm install

npm run dev
```

A API estará disponível em `http://localhost:3000`.

---

## Endpoints

### GET /livros

Retorna a lista de todos os livros cadastrados.

- **URL:** `http://localhost:3000/livros`
- **Método:** `GET`
- **Body:** Não necessário

Resposta de sucesso `200`:
```json
[
  {
    "id": 1,
    "titulo": "Duna",
    "autor": "Frank Herbert",
    "ano": 1965
  },
  {
    "id": 2,
    "titulo": "Os Irmãos Karamazov",
    "autor": "Fiódor Dostoiévski",
    "ano": 1880
  }
]
```

---

### GET /livros/:id

Retorna um único livro pelo ID.

- **URL:** `http://localhost:3000/livros/:id`
- **Método:** `GET`
- **Body:** Não necessário

Resposta de sucesso `200`:
```json
{
  "id": 1,
  "titulo": "Duna",
  "autor": "Frank Herbert",
  "ano": 1965
}
```

Livro não encontrado `404`:
```json
{
  "erro": "Livro não encontrado"
}
```

---

### POST /livros

Cadastra um novo livro.

- **URL:** `http://localhost:3000/livros`
- **Método:** `POST`
- **Content-Type:** `application/json`

Body da requisição:
```json
{
  "titulo": "Fundação",
  "autor": "Isaac Asimov",
  "ano": 1951
}
```

Resposta de sucesso `201`:
```json
{
  "id": 11,
  "titulo": "Fundação",
  "autor": "Isaac Asimov",
  "ano": 1951
}
```

Dados inválidos `400`:
```json
{
  "erro": "Os campos titulo, autor e ano são obrigatórios"
}
```

---

### PUT /livros/:id

Atualiza os dados de um livro existente.

- **URL:** `http://localhost:3000/livros/:id`
- **Método:** `PUT`
- **Content-Type:** `application/json`

Body da requisição:
```json
{
  "titulo": "Fundação e Império",
  "autor": "Isaac Asimov",
  "ano": 1952
}
```

Resposta de sucesso `200`:
```json
{
  "id": 11,
  "titulo": "Fundação e Império",
  "autor": "Isaac Asimov",
  "ano": 1952
}
```

Livro não encontrado `404`:
```json
{
  "erro": "Livro não encontrado"
}
```

---

### DELETE /livros/:id

Remove um livro pelo ID.

- **URL:** `http://localhost:3000/livros/:id`
- **Método:** `DELETE`
- **Body:** Não necessário

Resposta de sucesso `200`:
```json
{
  "mensagem": "Livro deletado com sucesso"
}
```

Livro não encontrado `404`:
```json
{
  "erro": "Livro não encontrado"
}
```

---

## Validações

As validações são aplicadas nos endpoints `POST` e `PUT`. Em caso de falha, a API retorna status `400` com uma mensagem descritiva do erro.

| Campo    | Regra                            |
|----------|----------------------------------|
| `titulo` | Obrigatório, não pode ser vazio  |
| `autor`  | Obrigatório, não pode ser vazio  |
| `ano`    | Obrigatório, deve ser numérico   |

---

## Status Codes

| Código | Descrição                   |
|--------|-----------------------------|
| 200    | Requisição bem-sucedida     |
| 201    | Recurso criado com sucesso  |
| 400    | Dados inválidos ou ausentes |
| 404    | Recurso não encontrado      |

---

## Registros iniciais

A API inicia com 10 livros pré-cadastrados:

| ID | Título                                              | Autor                    | Ano  |
|----|-----------------------------------------------------|--------------------------|------|
| 1  | Duna                                                | Frank Herbert            | 1965 |
| 2  | Os Irmãos Karamazov                                 | Fiódor Dostoiévski       | 1880 |
| 3  | O Problema dos Três Corpos                          | Cixin Liu                | 2008 |
| 4  | Neuromancer                                         | William Gibson           | 1984 |
| 5  | Cem Anos de Solidão                                 | Gabriel García Márquez   | 1967 |
| 6  | O Guia do Mochileiro das Galáxias                   | Douglas Adams            | 1979 |
| 7  | Fundação                                            | Isaac Asimov             | 1951 |
| 8  | Crime e Castigo                                     | Fiódor Dostoiévski       | 1866 |
| 9  | Blade Runner: Do Androids Dream of Electric Sheep?  | Philip K. Dick           | 1968 |
| 10 | O Silmarillion                                      | J.R.R. Tolkien           | 1977 |

---

## Testes no Postman

A collection com todos os testes está disponível no arquivo `My Collection.postman_collection.json`, incluído na raiz do repositório.

**Como importar:** abra o Postman, clique em **Import** e selecione o arquivo.

Requisições cobertas:

- `GET /livros` — listar todos os livros
- `GET /livros/:id` — buscar por ID válido
- `GET /livros/:id` — buscar por ID inexistente (404)
- `POST /livros` — criar livro com dados válidos
- `POST /livros` — criar livro sem campos obrigatórios (400)
- `POST /livros` — criar livro com ano inválido (400)
- `PUT /livros/:id` — atualizar livro existente
- `PUT /livros/:id` — atualizar livro inexistente (404)
- `DELETE /livros/:id` — deletar livro existente
- `DELETE /livros/:id` — deletar livro inexistente (404)

---

## Estrutura do projeto

```
apiRest-CRUDCOMPLETO/
├── api-livros/
├── node_modules/
├── index.js
├── package.json
├── package-lock.json
├── My Collection.postman_collection.json
└── README.md
```

---
