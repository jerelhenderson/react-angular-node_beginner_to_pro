const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const config = require('../config/dev')

const jwt = require('jsonwebtoken');

exports.auth = function(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(422).send({errors: [{"title": 'Data Missing', "detail": 'Provide email and password!'}]})
    }

    User.findOne({email}, (err, user) => {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (!user) {
            return res.status(422).send({errors: [{"title": 'Invalid user', "detail": 'User doesn\'t exist!'}]})
        }

        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username,
              }, config.JWT_SECRET, { expiresIn: '1h' });

              return res.json(token);
        } else {
            console.log(`Email: ${user.email} Password: ${user.password}`);
            return res.status(422).send({errors: [{"title": 'Incorrect data', "detail": 'Wrong email or password!'}]})
        }
    })
}

exports.register = function(req, res) {
    const { username, email, password, passwordConfirmation } = req.body;

    if(!email || !password) {
        return res.status(422).send({errors: [{"title": 'Data Missing', "detail": 'Provide email and password!'}]})
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{"title": 'Incorrect Password', "detail": 'Password does not match'}]})
    }

    // If the value: key are the same, only one is necessary
    User.findOne({email}, (err, existingUser) => {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (existingUser) {
            return res.status(422).send({errors: [{"title": 'Invalid email', "detail": 'This email address already exists'}]})
        }

        const user = new User({
            username, email, password
        });

        user.save((err) => {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json({'registered': true});
        });
    });
}