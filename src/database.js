const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simplejwt', {
    useNewUrlParser: true
})
    .then(console.log('Database is connected'))

