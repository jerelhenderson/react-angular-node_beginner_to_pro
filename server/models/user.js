const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, min: [4, 'Too short'], max: [32, 'Too long']},
    email: {type: String, min: [4, 'Too short'], max: [32, 'Too long'], required: 'Email address required', unqiue: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
    password: {type: String, min: [4, 'Too short'], max: [32, 'Too long'], required: "Password required"},
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

module.exports = mongoose.model('User', userSchema);