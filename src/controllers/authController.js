const { Router } = require('express');
const router = Router();

const User = require('../models/User');

// Proceso de registro
router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User ({
        username,
        email,
        password
    });
    // Encriptando la contraseña que pasa el usuario.
    user.password = await user.encryptPassword(user.password);
    await user.save();
    console.log(user);
    res.json({
        msg: 'Received'
    });
});

router.post('/signin', (req, res, next) => {
    res.json('signin');
});

router.get('/me', (req, res, next) => {
    res.json('me');
});

module.exports = router;