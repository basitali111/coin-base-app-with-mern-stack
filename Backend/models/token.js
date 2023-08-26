const mongoose = require('mongoose');

const {Schema} = mongoose;

const refreshTokenSchema = new Schema({
    token: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    isValid: {type: Boolean, default: true},
}, {timestamps: true});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema, 'tokens');

