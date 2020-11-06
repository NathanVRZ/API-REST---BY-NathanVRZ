const express = require('express');
const app = express();
const morgan = require('morgan');
const BodyParser = require('body-parser');

const rotaLojas = require('./routes/lojas'); 
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotasUsuarios = require('./routes/usuarios');
const cors = require('cors');

app.use(morgan('dev'));
app.use(BodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(BodyParser.json()); //json na entrada do body

app.use(cors());
app.use('/lojas', rotaLojas);
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/usuarios', rotasUsuarios);

// QUANDO NÃO ENCONTRA ROTA
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
}); 

module.exports = app;