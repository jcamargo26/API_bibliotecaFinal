const express = require('express');
const db = require('./database'); // Importa a conexão com o SQLite definida no outro arquivo
const app = express();

// Middleware para permitir que o Express entenda requisições com corpo em JSON
app.use(express.json());

/**
 * 1. ROTA DE LISTAGEM (READ)
 * Requisitos: Filtro por categoria, Ordenação e Paginação.
 */
app.get('/api/livros', (req, res) => {
    try {
        // Extrai parâmetros da URL (Query Params). Define valores padrão caso não sejam enviados.
        let { limite = 5, pagina = 1, ordem = 'titulo', categoria } = req.query;
        
        // Cálculo do OFFSET: pula os registros das páginas anteriores
        // Ex: Se estou na pág 2 com limite 5, o offset é 5 (pula os 5 primeiros)
        const offset = (parseInt(pagina) - 1) * parseInt(limite);
        
        let sql = "SELECT * FROM livros";
        let params = [];

        // Filtro dinâmico: Se houver categoria, adiciona o WHERE na query
        if (categoria) {
            sql += " WHERE categoria = ?";
            params.push(categoria);
        }

        // Adiciona ordenação e os limites da paginação
        sql += ` ORDER BY ${ordem} LIMIT ? OFFSET ?`;
        params.push(parseInt(limite), offset);

        // Executa a query no banco e busca todos os resultados 
        const dados = db.prepare(sql).all(...params);
        
        // Retorna os dados e informações de contexto da página
        res.json({
            pagina: parseInt(pagina),
            limite: parseInt(limite),
            total_na_pagina: dados.length,
            dados 
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar dados no servidor." });
    }
});

/**
 * 2. ROTA DE CRIAÇÃO (CREATE)
 * Requisitos: Validações robustas e Status Code 201.
 */
app.post('/api/livros', (req, res) => {
    const { titulo, autor, categoria, ano, estoque } = req.body;

    // Validação de segurança: Impede campos vazios no banco
    if (!titulo || !autor || !categoria || !ano) {
        return res.status(400).json({ erro: "Campos obrigatórios: titulo, autor, categoria e ano." });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO livros (titulo, autor, categoria, ano, estoque) 
            VALUES (?, ?, ?, ?, ?)
        `);
        
        const info = stmt.run(titulo, autor, categoria, ano, estoque || 0);
        
        // 201 Created: Indica que um novo recurso foi gerado com sucesso
        res.status(201).json({ 
            id: info.lastInsertRowid, // Retorna o ID gerado automaticamente pelo SQLite
            ...req.body 
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar o livro." });
    }
});

/**
 * 3. ROTA DE ATUALIZAÇÃO (UPDATE)
 * Requisitos: Verificar se existe e retornar status correto.
 */
app.put('/api/livros/:id', (req, res) => {
    const { id } = req.params; // Pega o ID da URL
    const { titulo, autor, categoria, ano, estoque } = req.body;

    try {
        const stmt = db.prepare(`
            UPDATE livros 
            SET titulo = ?, autor = ?, categoria = ?, ano = ?, estoque = ? 
            WHERE id = ?
        `);
        
        const resultado = stmt.run(titulo, autor, categoria, ano, estoque || 0, id);

        // Se 'changes' for 0, significa que o ID enviado não existe no banco
        if (resultado.changes === 0) {
            return res.status(404).json({ erro: "Livro não encontrado para atualização." });
        }

        res.json({ mensagem: "Livro atualizado com sucesso!", id });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar dados." });
    }
});

/**
 * 4. ROTA DE EXCLUSÃO (DELETE)
 * Requisitos: Retornar 204 No Content.
 */
app.delete('/api/livros/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM livros WHERE id = ?');
        const resultado = stmt.run(req.params.id);

        if (resultado.changes === 0) {
            return res.status(404).json({ erro: "Livro não encontrado para exclusão." });
        }

        // 204 No Content: Sucesso absoluto, mas não há corpo na resposta 
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar registro." });
    }
});

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(` Use GET http://localhost:${PORT}/api/livros para ver os registros.`);
});