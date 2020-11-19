const express = require('express');
const router = express.Router();
const mysql = require('../config').pool;
const Login = require('../middleware/login');

const ProdutosControle = require('../controllers/ProdutosControl');

router.get('/', ProdutosControle.getProdutos);
router.post('/', ProdutosControle.postProduto);
router.get('/:idProduto', ProdutosControle.getUmProduto);
router.put('/', ProdutosControle.putProduto);
router.delete('/', ProdutosControle.deleteProduto);



module.exports = router;