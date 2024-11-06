// Profile.js
import React from 'react';

const ClientProfile = () => {
    // Dummy user data for demonstration purposes
    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        purchasedCars: ['Toyota Camry', 'Honda Civic'],
        rentedCars: ['Tesla Model 3'],
    };

    return (
        <div className="profile-container">
            <h2>Client Profile</h2>
            <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="car-history">
                <h3>Purchased Cars</h3>
                <ul>
                    {user.purchasedCars.map((car, index) => (
                        <li key={index}>{car}</li>
                    ))}
                </ul>

                <h3>Rented Cars</h3>
                <ul>
                    {user.rentedCars.map((car, index) => (
                        <li key={index}>{car}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ClientProfile;
