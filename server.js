const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()
require("./config/databaseConnection")


// diğer kodlar

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(() => {
    console.log('Veri tabanına baglantı basarılı');
}).catch((err) => {
    console.log('Veri tabanı baglantısı basarısız: ', err);
});


const userSchema = new mongoose.Schema({
name: String,
email: String,
phone: String,
message: String,
category: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
try {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        category: req.body.category
    });
    await user.save();
    res.send(user);
} catch (error) {
    console.log(error);
    res.status(500).send(error);
}
});

const adminUsername = 'admin';
const adminPassword = 'password';

app.post('/api/login', async (req, res) => {
try {
    const username = req.body.username;
    const password = req.body.password;

    if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username: username }, 'secret');
    res.send({ token: token });
    } else {
    res.status(401).send({ error: 'Invalid username or password' });
    }
} catch (error) {
    console.log(error);
    res.status(500).send(error);
}
});



app.get('/api/users', async (req, res) => {
try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret');

    const users = await User.find();
    res.send(users);
} catch (error) {
    console.log(error);
    res.status(401).send({ error: 'Invalid token' });
}
});

app.listen(3500, () => {
console.log('Server listening on port 3500');
});
