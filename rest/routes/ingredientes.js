const express = require('express');
const router = express.Router();
const mysql = require('../config').pool;

const IngredientesControle = require('../controllers/ingredientesControl');

router.get('/', IngredientesControle.getIngredientes);
router.post('/', IngredientesControle.postIngredientes);
router.get('/:idIngrediente', IngredientesControle.getUmIngrediente);
router.patch('/', IngredientesControle.patchIngrediente);
router.delete('/', IngredientesControle.deleteIngrediente);



module.exports = router;