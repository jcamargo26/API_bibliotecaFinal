# 📚 API Biblioteca - Gerenciamento de Livros (v2)

Esta é uma API REST robusta desenvolvida para o gerenciamento de um acervo de biblioteca, utilizando **Node.js**, **Express** e **SQLite**. O projeto foca em boas práticas, validações de dados e persistência real em banco de dados.

---

## 🚀 Tecnologias Utilizadas
* **Node.js**: Ambiente de execução.
* **Express**: Framework para construção das rotas e API.
* **Better-SQLite3**: Driver de banco de dados SQLite de alta performance.
* **Postman**: Para testes e documentação das requisições.

---

## 🛠️ Funcionalidades (Requisitos Atendidos)
- [x] **CRUD 100%**: Create, Read, Update e Delete funcionando com persistência no SQLite.
- [x] **Persistência**: Arquivo `biblioteca.db` gerado automaticamente.
- [x] **Filtros e Busca**: Possibilidade de filtrar livros por categoria.
- [x] **Paginação e Ordenação**: Controle de limites e offset via Query Params.
- [x] **Validações**: Verificação de campos obrigatórios e tipos de dados.
- [x] **Status Codes**: Uso correto de 201 (Created), 204 (No Content), 400 (Bad Request) e 404 (Not Found).
- [x] **Massa de Dados**: O banco inicia automaticamente com 20 registros para teste.

---
## 📸 Demonstração do Projeto (Evidências de Teste)

Abaixo estão os registros das funcionalidades sendo testadas via Postman, comprovando a persistência no banco de dados SQLite e o funcionamento das rotas.

### 1. Listagem de Livros (GET)
Retorno de todos os registros presentes no banco de dados com suporte a paginação.
![Listagem](./Prints/Listagem_GET.jpg)

### 2. Filtro por Categoria
Exemplo de busca filtrada por uma categoria específica através de Query Params.
![Filtro](./Prints/Categoria_GET.jpg)

### 3. Cadastro de Novo Livro (POST)
Criação de um novo registro com retorno de Status 201 (Created).
![Cadastro](./Prints/Cadastro_POST.jpg)

### 4. Tratamento de Erros e Validação
Demonstração da API impedindo o cadastro de dados incompletos ou inválidos (Status 400).
![Validação](./Prints/ErroValidacao_POST.jpg)

### 5. Atualização de Dados (PUT)
Edição de um livro existente filtrado pelo ID na URL.
![Atualização](./Prints/Atualizacao_PUT.jpg)

### 6. Remoção de Livro (DELETE)
Exclusão definitiva de um registro do banco de dados (Status 204).
![Exclusão](./Prints/Exclusao_DELETE.jpg)

---
## Como Instalar e Rodar

**Clonar o repositório:**
   ```bash
   git clone https://github.com/jcamargo26/API_bibliotecaFinal.git