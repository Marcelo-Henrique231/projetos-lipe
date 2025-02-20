require('dotenv').config();

const express = require('express');
const { Client } = require('pg'); // Usando o PostgreSQL
const app = express();
const port = 3000;

// Configuração do PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // URL do Supabase
  ssl: { rejectUnauthorized: false }
});

// Conectar ao banco de dados
client.connect();

// Criar tabela se não existir
client.query(`
    CREATE TABLE IF NOT EXISTS dados (
        id SERIAL PRIMARY KEY,
        coluna1 TEXT,
        coluna2 TEXT,
        coluna3 TEXT
    )
`).then(() => {
    console.log('Tabela criada ou já existente.');
}).catch(err => {
    console.error('Erro ao criar tabela:', err);
});

// Middleware para permitir o uso de JSON
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Rota para salvar dados da Coluna 1
app.post('/salvar-coluna1', (req, res) => {
    const { coluna1 } = req.body;
    client.query(
        'INSERT INTO dados (coluna1) VALUES ($1)',
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
    client.query(
        'INSERT INTO dados (coluna2) VALUES ($1)',
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
    client.query(
        'INSERT INTO dados (coluna3) VALUES ($1)',
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
    client.query('SELECT * FROM dados', (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(result.rows); // Retorna todos os dados em formato JSON
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});