const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

/*

Rutas de Usuarios / Auth
host + /api/auth 

*/

router.post(
        '/new', 
        [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),

        ],
        createUser
    );

router.post(
        '/', 
        [//middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),

        ],
        loginUser
    );

router.get('/renew', renewToken);

module.exports = router;