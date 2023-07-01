const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

const database = require('./utils/db');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.listen(port, () => {
    console.log(`Server is Successfully Running on PORT: http://localhost:${port}`);
    database();
})

// Routes
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/user', cartRoutes);
app.use('/user', orderRoutes);