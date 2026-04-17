# Reescreve o README com encoding UTF-8 correto
cat > README.md << 'EOF'
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
EOF