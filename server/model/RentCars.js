const mongoose = require('mongoose');

const rentCarSchema = new mongoose.Schema({
    make: { type: String, required: true },                       // Manufacturer of the car (e.g., Toyota, Ford)
    model: { type: String, required: true },                      // Model of the car (e.g., Corolla, Mustang)
    year: { type: Number, required: true },                       // Manufacturing year of the car
    color: { type: String, required: true },                      // Color of the car
    bodyType: { type: String, required: true },                   // Body type (e.g., sedan, SUV)
    transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },  // Transmission type
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true }, // Fuel type
    mileage: { type: Number, required: true },                    // Number of kilometers or miles the car has traveled
    engineSize: { type: String, required: true },                 // Engine size (e.g., 2.0L, 3.5L)
    numberOfSeats: { type: Number, required: true },              // Number of seats in the car
    numberOfDoors: { type: Number, required: true },              // Number of doors on the car
    availabilityStatus: {                                         // Status of the car (e.g., available, rented, under maintenance)
        type: String,
        enum: ['Available', 'Rented', 'Under Maintenance'],
        default: 'Available'
    },
    currentRenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Reference to the user renting the car
    rentalStartDate: { type: Date },                             // Start date of the current rental
    rentalEndDate: { type: Date },                               // End date of the current rental
    description: { type: String },                               // Additional description of the car
    image: { type: String },                                     // Image URL or path
    registrationNumber: { type: String, required: true, unique: true }, // Car's registration number/license plate
    vin: { type: String, required: true, unique: true },         // Vehicle Identification Number
    condition: { type: String, enum: ['New', 'Used', 'Certified Pre-Owned'], default: 'New' }, // Condition of the car
    insuranceDetails: { type: String },                          // Insurance information for the car
    lastServicedDate: { type: Date },                            // Date when the car was last serviced
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model("RentCars", rentCarSchema);
