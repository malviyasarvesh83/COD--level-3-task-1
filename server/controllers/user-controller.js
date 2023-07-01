const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Secret_Key = process.env.TOKEN_SECRET_KEY;

const generateAccessToken = (id, name) => {
    return jwt.sign({ userId: id, name: name }, Secret_Key);
}

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, address, city, state, pin, password } = req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
          const response = await User.create({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            address: address,
            city: city,
            state: state,
            pinCode: pin,
            password: hash,
          });
          res.status(201).json({ message: "User Created Successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: "Email Already Exists" });
    }
}

exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        bcrypt.compare(password, user.password, (err, response) => {
            if (response == true) {
                res.status(200).json({ message: "Logged In Successfully..!", token: generateAccessToken(user.id, user.name) });
            } else {
                res.status(400).json({ error: "Invalid Email or Password" });
            }
        })
    } catch (error) {
        res.status(404).json({ error: "User Not Found" });
    }
}