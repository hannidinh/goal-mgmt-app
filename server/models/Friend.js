const mongoose = require('mongoose');
const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
})

module.exports = mongoose.model('Friend', FriendSchema);