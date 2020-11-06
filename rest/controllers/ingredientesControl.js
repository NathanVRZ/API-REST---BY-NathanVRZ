const mysql = require('../config').pool;

exports.getIngredientes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            'SELECT * FROM ingrediente',
            (erro, resultado, fields) => {
                if (error) {return res.status(500).send( { error: error}) }
                return res.status(200).send({response: resultado})
            }
        )
    });

};

exports.postIngredientes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            'INSERT INTO ingrediente (nome, quantidade) VALUES (?,?)',
            [req.body.nome, req.body.quantidade],
            (error, resultado, field) => {  
                conn.release();
                if(error) { return res.status(500).send({error: erro})}

                res.status(201).send({
                    mensagem: 'Ingrediente criado com sucesso',
                    idProduto: resultado.insertid 
                });

            }
        )
    });
}

exports.getUmIngrediente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            'SELECT * FROM ingrediente WHERE idIngrediente = ?',
            [req.params.idProduto],
            (erro, resultado, fields) => {
                if (error) {return res.status(500).send( { error: error}) }
                return res.status(200).send({response: resultado})
            }
        )
    });  
};

exports.patchIngrediente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            `UPDATE ingrediente
                SET nome        = ?,
                quantidade      = ?
                WHERE idIngrediente = ?`,
            [   req.body.nome, 
                req.body.quantidade, 
                req.body.idProduto
            ],
            (error, resultado, field) => {  
                conn.release();
                if(error) { return res.status(500).send({error: erro})}

                res.status(202).send({
                    mensagem: 'Ingrediente alterado com sucesso',
                });

            }
        )
    });
};

 exports.deleteIngrediente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: erro})}
        conn.query(
            `DELETE FROM produtos WHERE idIngrediente = ?`,
            [req.body.idProduto],
            (error, resultado, field) => {  
                conn.release();
                if(error) { return res.status(500).send({error: erro})}

                res.status(202).send({
                    mensagem: 'Ingrediente DELETADO com sucesso',
                });

            }
        )
    });
};

