const express = require('express');
const router = express.Router();
const mysql = require('../config').pool;
const bcrypt = require('bcrypt');
// const { INSERT } = require('sequelize/types/lib/query-types');
// const { response } = require('express');


router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    })
});

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err,conn) => {
        if (err) {return res.status(500).send({ error: error }) }
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt}) }
            conn.query(
                `INSERT INTO Clientes (Email, senha, Loja, Rua, CNPJ, UnidadesAssinadas) VALUES (?,?,?,?,?,?)`,
                [req.body.Email, hash, req.body.Loja, req.body.Rua, req.body.CNPJ, req.body.UnidadeAssinadas], 
                (error, results) => {
                    conn.release();
                    if (err) { return res.status(500).send({ error: error}) }
                    response = {
                        mensagem: 'usuario criado',
                        usuarioCriado: {
                            idClientes: results.insertid,
                            Email: req.body.Email
                        }
                    }
                    return res.status(201).send(response);
                }
                
            );
        });
    });
})


module.exports = router;