const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, min: [4, 'Too short'], max: [32, 'Too long']},
    email: {type: String, min: [4, 'Too short'], max: [32, 'Too long'], required: 'Email address required', unqiue: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
    password: {type: String, min: [4, 'Too short'], max: [32, 'Too long'], required: "Password required"},
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

userSchema.pre('save', (next) => {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User', userSchema);