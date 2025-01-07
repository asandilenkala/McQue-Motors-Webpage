const mongoose = require('mongoose');

const saleCarSchema = new mongoose.Schema({
    make: { type: String, required: true },                     // Manufacturer of the car (e.g., Toyota, Ford)
    model: { type: String, required: true },                    // Model of the car (e.g., Corolla, Mustang)
    year: { type: Number, required: true },                     // Manufacturing year of the car
    color: { type: String, required: true },                    // Color of the car
    bodyType: { type: String, required: true },                 // Body type (e.g., sedan, SUV)
    transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },  // Transmission type
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true }, // Fuel type
    mileage: { type: Number, required: true },                  // Number of kilometers or miles the car has traveled
    engineSize: { type: String, required: true },               // Engine size (e.g., 2.0L, 3.5L)
    numberOfSeats: { type: Number, required: true },            // Number of seats in the car
    numberOfDoors: { type: Number, required: true },            // Number of doors on the car
    price: { type: Number, required: true },                    // Selling price of the car
    availabilityStatus: {                                       // Status of the car (available, sold, rented, etc.)
        type: String, 
        enum: ['Available', 'Sold', 'Under Maintenance'],
        default: 'Available'
    },
    description: { type: String },                              // Additional description of the car
    image: { type: [String] },                                    // Image URL or path
    registrationNumber: { type: String, required: true, unique: true },  // Car's registration number/license plate
    vin: { type: String, required: true, unique: true },        // Vehicle Identification Number
    warrantyDetails: { type: String },                          // Information about the warranty
    condition: { type: String, enum: ['New', 'Used', 'Certified Pre-Owned'], default: 'New' }, // Condition of the car
    createdAt: { type: Date, default: Date.now },               // Timestamp when the car entry was created
    updatedAt: { type: Date, default: Date.now },               // Timestamp when the car entry was last updated

});

// Update the timestamp when the car document is modified
saleCarSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('SaleCars', saleCarSchema);
