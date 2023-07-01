const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@facebook.memzcaa.mongodb.net/flipkart?retryWrites=true&w=majority`;

const database = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log(`Error while Connecting Database:${error.message}`);
    }
}

module.exports = database;