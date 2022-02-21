const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./verifyToken');

const User = require('../models/User');

// Proceso de registro de un usuario
router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    });
    // Encriptando la contraseña que pasa el usuario.
    user.password = await user.encryptPassword(user.password);
    await user.save();

    // Añadiendo el token al usuario.
    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({
        auth: true,
        token
    });
});

// Proceso para que un usuario registrado navegue por la app.
// Escribir el middleware verifyToken en cada ruta que queramos validar.
router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).send('No user found');
    };
    res.json(user);
});

// Proceso para que un usuario regustrado inicie sesión.
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('The email doesn`t exists');
    };

    const validPassword = await user.validatePassword(password);

    if(!validPassword){
        return res.status(401).json({
            auth: false,
            token: null
        });
    }

    const token = jwt.sign({id:user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({
        auth: true,
        token
    });
});


module.exports = router;