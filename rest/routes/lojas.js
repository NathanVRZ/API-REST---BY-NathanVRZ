const express = require('express');
const router = express.Router();

// RETORNA TODAS AS LOJAS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todas as lojas'
    })
});


//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'Produto inserido',
        ProdutoCriado: produto
    })
});


// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;

    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'Voce descobriu um id especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Voce passou um id'
        })
    }  
});


// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota produto'
    })
});


// DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota produto'
    })
});



module.exports = router;