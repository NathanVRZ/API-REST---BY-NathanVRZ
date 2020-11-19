const express = require('express');
const router = express.Router();
const mysql = require('../config').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const UsuariosControle = require('../controllers/usuariosControl')

router.get('/', UsuariosControle.getUsuarios);
router.get('/:idUsuario', UsuariosControle.getUmUsuario);
router.post('/cadastro', UsuariosControle.postCadastro);
router.post('/login', UsuariosControle.postLogin);

module.exports = router;