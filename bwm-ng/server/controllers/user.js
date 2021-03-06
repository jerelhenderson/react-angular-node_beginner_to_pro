const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config')

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

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, function(err, user) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res);
            }
        });
    } else {
        return notAuthorized(res);
    }

function parseToken(token) {
        // Token format is: '{Bearer, fji439iufi23iu2fn2iufh2320f'}
        return jwt.verify(token.split(' ')[1], config.JWT_SECRET);
    }
}

function notAuthorized(res) {
    return res.status(401).send({errors: "Not authorized", details: "You need to login to gain access."});
}