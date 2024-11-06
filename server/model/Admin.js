const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true  // Remove whitespace from both ends of the username
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // Convert email to lowercase
        trim: true,       // Remove whitespace from both ends of the email
        match: [/.+@.+\..+/, 'Please enter a valid email address']  // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8  // Password must be at least 8 characters long
    },
    role: {
        type: String,
        enum: ['Admin', 'Super Admin'],
        default: 'Admin'  // Admin by default; you can also have Super Admins with more privileges
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10,15}$/, 'Please enter a valid contact number']  // Validates the contact number
    },
    isActive: {
        type: Boolean,
        default: true  // Determines if the admin account is active or disabled
    },
    permissions: {
        canEditCars: { type: Boolean, default: true },          // Permission to edit car details
        canDeleteCars: { type: Boolean, default: true },        // Permission to delete cars
        canManageUsers: { type: Boolean, default: false },      // Permission to manage other user accounts
        canViewReports: { type: Boolean, default: true }        // Permission to view sales or rental reports
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Admin", adminSchema);
