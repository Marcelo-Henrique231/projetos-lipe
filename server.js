const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Criar tabela se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS dados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coluna1 TEXT,
        coluna2 TEXT,
        coluna3 TEXT
    )
`);

// Middleware para permitir o uso de JSON
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Rota para salvar dados da Coluna 1
app.post('/salvar-coluna1', (req, res) => {
    const { coluna1 } = req.body;
    db.run(
        'INSERT INTO dados (coluna1) VALUES (?)',
        [coluna1],
        (err) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.send('Dados da Coluna 1 salvos com sucesso!');
        }
    );
});

// Rota para salvar dados da Coluna 2
app.post('/salvar-coluna2', (req, res) => {
    const { coluna2 } = req.body;
    db.run(
        'INSERT INTO dados (coluna2) VALUES (?)',
        [coluna2],
        (err) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.send('Dados da Coluna 2 salvos com sucesso!');
        }
    );
});

// Rota para salvar dados da Coluna 3
app.post('/salvar-coluna3', (req, res) => {
    const { coluna3 } = req.body;
    db.run(
        'INSERT INTO dados (coluna3) VALUES (?)',
        [coluna3],
        (err) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.send('Dados da Coluna 3 salvos com sucesso!');
        }
    );
});

// Rota para recuperar todos os dados
app.get('/dados', (req, res) => {
    db.all('SELECT * FROM dados', (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows); // Retorna todos os dados em formato JSON
    });
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});