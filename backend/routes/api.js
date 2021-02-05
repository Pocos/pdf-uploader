// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fs = require('fs');

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/aruba';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// create mongoose model
const User = mongoose.model('User', userSchema);


/_ GET api listing. _/
router.get('/', (req, res) => {
        console.log("aaa");
        fs.writeFileSync('data/3.txt',"This is a test");

        res.send('api works');
});

/_ GET all users. _/
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/_ GET one users. _/
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/_ Create a user. _/
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

module.exports = router;