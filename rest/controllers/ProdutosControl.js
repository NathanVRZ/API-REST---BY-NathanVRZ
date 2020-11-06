const mysql = require('../config').pool;

exports.getProdutos = (req, res, next) => {
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

};

exports.postProduto = (req, res, next) => {
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
};

exports.getUmProduto = (req, res, next) => {
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
};

exports.patchProduto = (req, res, next) => {
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
};

exports.deleteProduto = (req, res, next) => {
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
};