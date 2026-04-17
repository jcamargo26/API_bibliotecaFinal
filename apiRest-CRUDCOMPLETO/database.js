const Database = require('better-sqlite3');
const db = new Database('biblioteca.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    categoria TEXT NOT NULL,
    ano INTEGER NOT NULL,
    estoque INTEGER DEFAULT 0
  )
`);

const check = db.prepare('SELECT count(*) as total FROM livros').get();

if (check.total === 0) {
    const insert = db.prepare('INSERT INTO livros (titulo, autor, categoria, ano, estoque) VALUES (?, ?, ?, ?, ?)');
    const livros = [
        ['O Alquimista', 'Paulo Coelho', 'Romance', 1988, 15],
        ['1984', 'George Orwell', 'Distopia', 1949, 8],
        ['Dom Casmurro', 'Machado de Assis', 'Clássico', 1899, 5],
        ['O Hobbit', 'J.R.R. Tolkien', 'Fantasia', 1937, 12],
        ['Admirável Mundo Novo', 'Aldous Huxley', 'Distopia', 1932, 7],
        ['A Hora da Estrela', 'Clarice Lispector', 'Clássico', 1977, 10],
        ['Cem Anos de Solidão', 'Gabriel García Márquez', 'Realismo Mágico', 1967, 4],
        ['O Senhor dos Anéis', 'J.R.R. Tolkien', 'Fantasia', 1954, 20],
        ['O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Infantil', 1943, 30],
        ['Fahrenheit 451', 'Ray Bradbury', 'Distopia', 1953, 9],
        ['Ensaio Sobre a Cegueira', 'José Saramago', 'Ficção', 1995, 6],
        ['Capitães da Areia', 'Jorge Amado', 'Clássico', 1937, 11],
        ['O Código Da Vinci', 'Dan Brown', 'Suspense', 2003, 25],
        ['A Menina que Roubava Livros', 'Markus Zusak', 'Drama', 2005, 14],
        ['O Caçador de Pipas', 'Khaled Hosseini', 'Drama', 2003, 18],
        ['Memórias Póstumas de Brás Cubas', 'Machado de Assis', 'Clássico', 1881, 8],
        ['Crime e Castigo', 'Fiódor Dostoiévski', 'Filosofia', 1866, 3],
        ['Grande Sertão: Veredas', 'Guimarães Rosa', 'Clássico', 1956, 5],
        ['Frankenstein', 'Mary Shelley', 'Terror', 1818, 12],
        ['Drácula', 'Bram Stoker', 'Terror', 1897, 10]
    ];
    for (const l of livros) insert.run(...l);
    console.log("Banco populado.");
}

module.exports = db;