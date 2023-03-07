
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(() => {
    console.log('Veri tabanına baglantı basarılı');
}).catch((err) => {
    console.log('Veri tabanı baglantısı basarısız: ', err);
});
