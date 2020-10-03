const User = require('../models/user');

exports.auth = function(req, res) {

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
            return res.status(422).send({'mongoose': "Handle errors"})
        }

        if (existingUser) {
            return res.status(422).send({errors: [{"title": 'Invalid email', "detail": 'This email address already exists'}]})
        }

        const User = new User({
            username, email, password
        });

        user.save((err) => {
            if (err) {
                return res.status(422).send({"mongoose": "Handle errors"})
            }

            return res.json({'registered': true});
        });
    });
}