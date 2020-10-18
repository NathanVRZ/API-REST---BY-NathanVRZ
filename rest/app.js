const express = require('express');
const app = express();
const morgan = require('morgan');
const BodyParser = require('body-parser');

const rotaLojas = require('./routes/lojas'); 
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(BodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(BodyParser.json()); //json na entrada do body

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Header', 'Origin, X-Requested-With, Content-type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

app.use('/lojas', rotaLojas);
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

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