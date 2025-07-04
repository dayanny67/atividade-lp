// routes/produto.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Buscar todos os produtos
router.get('/', async (req, res) => {
  try {
    const dados = await db.query('SELECT * FROM produtos');
    res.json(dados.rows);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Buscar um produto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dados = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);

    if (dados.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.json(dados.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Cadastrar novo produto
router.post('/', async (req, res) => {
  const { nome, preco } = req.body;
  try {
    await db.query('INSERT INTO produtos (nome, preco) VALUES ($1, $2)', [nome, preco]);
    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  try {
    await db.query('UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3', [nome, preco, id]);
    res.json({ mensagem: 'Produto atualizado' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Remover produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM produtos WHERE id = $1', [id]);
    res.json({ mensagem: 'Produto excluído' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;