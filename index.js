const express = require ('express');
const app = express();
const produtoRoutes = require('./routes/produto');
const clienteRoutes = require(',/routea/cliente');

app.use (express.json());

// Rotas
app.use('/produtos', produtoRoutes);
app.use('/clientes', clienteRoutes);

// Servidor
const PORT  = 3000;
    app.listen (PORT , () => {
        console.log(`Servidor rodando na porta $ {PORT}`);
   });