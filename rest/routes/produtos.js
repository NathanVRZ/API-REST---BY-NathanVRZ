const express = require('express');
const router = express.Router();
const mysql = require('../config').pool;

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            'SELECT * FROM produtos',
            (erro, resultado, fields) => {
                if (error) {return res.status(500).send( { error: error}) }
                return res.status(200).send({response: resultado})
            }
        )
    });

});


//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            'INSERT INTO produtos (nome, quantidade) VALUES (?,?)',
            [req.body.nome, req.body.quantidade],
            (error, resultado, field) => {  
                conn.release();
                if(error) { return res.status(500).send({error: erro})}

                res.status(201).send({
                    mensagem: 'Produto criado com sucesso',
                    idProduto: resultado.insertid 
                });

            }
        )
    });
});


// RETORNA OS DADOS DE UM PRODUTO
router.get('/:idProduto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            'SELECT * FROM produtos WHERE idProduto = ?',
            [req.params.idProduto],
            (erro, resultado, fields) => {
                if (error) {return res.status(500).send( { error: error}) }
                return res.status(200).send({response: resultado})
            }
        )
    });  
});


// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            `UPDATE produtos
                SET nome        = ?,
                quantidade      = ?
                WHERE idProduto = ?`,
            [   req.body.nome, 
                req.body.quantidade, 
                req.body.idProduto
            ],
            (error, resultado, field) => {  
                conn.release();
                if(error) { return res.status(500).send({error: erro})}

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso',
                });

            }
        )
    });
});


// DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            `DELETE FROM produtos WHERE idProduto = ?`,
            [req.body.idProduto],
            (error, resultado, field) => {  
                conn.release();
                if(error) { return res.status(500).send({error: erro})}

                res.status(202).send({
                    mensagem: 'Produto DELETADO com sucesso',
                });

            }
        )
    });
});



module.exports = router;