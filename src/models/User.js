const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

// Encriptación de la contraseña
userSchema.methods.encryptPassword = async (password) => {
    // genSant indica cuantas veces queremos aplicar el algoritmo para hacerlo más seguro.
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

module.exports = model('user', userSchema);