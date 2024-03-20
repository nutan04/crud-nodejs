const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    employee_id: {
        type: Number,
        required: true,

    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
