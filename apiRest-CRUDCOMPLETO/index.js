const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Mínimo 10 registros iniciais (Requisito do trabalho)
let livros = [
    { id: 1, titulo: "Duna", autor: "Frank Herbert", ano: 1965 },
    { id: 2, titulo: "Os Irmãos Karamazov", autor: "Fiódor Dostoiévski", ano: 1880 },
    { id: 3, titulo: "O Problema dos Três Corpos", autor: "Cixin Liu", ano: 2008 },
    { id: 4, titulo: "Neuromancer", autor: "William Gibson", ano: 1984 },
    { id: 5, titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", ano: 1967 },
    { id: 6, titulo: "O Guia do Mochileiro das Galáxias", autor: "Douglas Adams", ano: 1979 },
    { id: 7, titulo: "Fundação", autor: "Isaac Asimov", ano: 1951 },
    { id: 8, titulo: "Crime e Castigo", autor: "Fiódor Dostoiévski", ano: 1866 },
    { id: 9, titulo: "Blade Runner: Do Androids Dream of Electric Sheep?", autor: "Philip K. Dick", ano: 1968 },
    { id: 10, titulo: "O Silmarillion", autor: "J.R.R. Tolkien", ano: 1977 }
];
let proximoId = 11;

// GET - Listar todos
app.get('/livros', (req, res) => {
    res.json(livros);
});

// GET - Buscar por ID (Boa prática)
app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(livro);
});

// POST - Criar livro
app.post('/livros', (req, res) => {
    const { titulo, autor, ano } = req.body;

    // Validações completas
    if (!titulo || !autor || typeof ano !== 'number') {
        return res.status(400).json({ erro: "Dados inválidos. Verifique título, autor e ano." });
    }

    const novoLivro = { id: proximoId++, titulo, autor, ano };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

// PUT - Atualizar livro
app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, ano } = req.body;

    const index = livros.findIndex(l => l.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para atualização" });
    }

    // Validação dos dados novos
    if (!titulo || !autor || typeof ano !== 'number') {
        return res.status(400).json({ erro: "Dados inválidos para atualização" });
    }

    livros[index] = { id, titulo, autor, ano };
    res.json(livros[index]);
});

// DELETE - Remover livro
app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado para exclusão" });
    }

    livros.splice(index, 1);
    res.status(204).send(); // 204 No Content é o correto para Delete
});

// Info do sistema
app.get('/info', (req, res) => {
    res.json({
        projeto: "API REST de Livros - Trabalho 2",
        estudante: "João Vitor Ribeiro",
        status: "CRUD 100% Funcional"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});