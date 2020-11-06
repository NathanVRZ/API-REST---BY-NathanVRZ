const express = require('express');
const router = express.Router();
const mysql = require('../config').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            'SELECT * FROM usuario',
            (erro, resultado, fields) => {
                if (error) {return res.status(500).send( { error: error}) }
                return res.status(200).send({response: resultado})
            }
        )
    });

});


router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err,conn) => {
        if (err) {return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM usuario WHERE Email = ?', [req.body.Email], (error, results) => {
            if (err) {return res.status(500).send({ error: error }) }
            if (results.length > 0){
                res.status(409).send({ mensagem: 'Usuário já cadastrado' })
            }else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt}) }
                    conn.query(
                        `INSERT INTO usuario (Email, senha, Loja, Rua, CNPJ, UnidadesAssinadas) VALUES (?,?,?,?,?,?)`,
                        [req.body.Email, hash, req.body.Loja, req.body.Rua, req.body.CNPJ, req.body.UnidadesAssinadas], 
                        (error, results) => {
                            conn.release();
                            if (err) { return res.status(500).send({ error: error}) }
                            response = {
                                mensagem: 'usuario criado',
                                usuarioCriado: {
                                    // idClientes: results.insertid,
                                    Email: req.body.Email
                                }
                            }
                            return res.status(201).send(response);
                        }
                        
                    );
                });
            }
        })


    });
})

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        const query = `SELECT * FROM usuario WHERE Email = ?`;
        conn.query(query, [req.body.Email],(error, results, fields) => {
            conn.release();
            if(error) {return res.status(500).send({error: error})}
            if(results.length < 1){
                return res.status(401).send({ mensagem: 'falha na autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if(err) {
                return res.status(401).send({ mensagem: 'falha na autenticação' })
                }
                if (result) {
                    const token = jwt.sign({
                        idUsuario: results[0].idUsuario,
                        Email: results[0].Email
                    }, 'process.env.JWT_KEY', {
                        expiresIn: "1h"
                    });
                    return res.status(200).send({ 
                        mensagem: 'Autenticado com sucesso',
                        token: token 
                    })
                }
                return res.status(401).send({mensagem: 'falha na autenticação'})
            });
        });
    });
})

module.exports = router;