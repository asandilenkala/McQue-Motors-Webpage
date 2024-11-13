const mongoose = require('mongoose');

const clientRentingSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    ID_File: { type: String, required: true },
    carID: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('ClientRenting', clientRentingSchema);