// models/Client.js

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Automatically add the creation timestamp
});

module.exports = mongoose.model('Client', clientSchema);
