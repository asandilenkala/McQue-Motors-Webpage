import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SaleCarDetails = () => {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Fetch car details when component mounts
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/purchase/car/${carId}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [carId]);

    const collectData = async (e) => {
        e.preventDefault();

        try {
            const messageWithCarId = `[Sale Car ID => ${carId}] : ${message}`;

            const result = await fetch("http://localhost:5000/clients", {
                method: "POST",
                body: JSON.stringify({ fullname, email, message: messageWithCarId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (result.ok) {
                const data = await result.json();
                console.log(data);
                alert('Message Sent Successfully!');
                navigate('/');
            } else {
                console.error(`Error: ${result.statusText} (${result.status})`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    if (!car) {
        return <p>Loading car details...</p>;
    }

    // Ensure car.image is an array
    const carImages = Array.isArray(car.image) ? car.image : [];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="car-details-container">
            <button onClick={goBack} className="back-button">Back to Car List</button>
            <div className="car-details-card">

                {/* Car image slider */}
                {/*<Slider {...settings} className="car-image-slick">*/}
                    {carImages.map((image, index) => (
                        <div key={index}>
                            <img
                                src={`http://localhost:5000${image}`}
                                alt={`Car ${index + 1}`}
                                className="car-images"
                            />
                        </div>
                    ))}
                {/*</Slider>*/}

                <p className="price"><strong>Price:</strong> R{car.price}</p>
                <div className="car-info">
                    <h1>About This Car</h1>
                    <p><strong>Make:</strong> {car.make}</p>
                    <p><strong>Model:</strong> {car.model}</p>
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Condition:</strong> {car.condition}</p>
                    <p><strong>Body Type:</strong> {car.bodyType}</p>
                    <p><strong>Description:</strong> {car.description}</p>
                    <p><strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                    <p><strong>Mileage:</strong> {car.mileage} km</p>
                    <p><strong>Color:</strong> {car.color}</p>
                    <p><strong>Engine Size:</strong> {car.engineSize}</p>
                    <p><strong>Number Of Seats:</strong> {car.numberOfSeats}</p>
                    <p><strong>Number Of Doors:</strong> {car.numberOfDoors}</p>
                    <p><strong>Availability Status:</strong> {car.availabilityStatus}</p>
                    <p><strong>Registration Number:</strong> {car.registrationNumber}</p>
                    <p><strong>Vehicle Identification Number:</strong> {car.vin}</p>
                    <p><strong>Warranty Details:</strong> {car.warrantyDetails}</p>
                </div>

                {/* Contact form */}
                <div className="contact">
                    <h1>Contact Us</h1>
                    <form className="contact-form" onSubmit={collectData}>
                        <label htmlFor="name">Full Name:</label>
                        <input
                            className="placeholders"
                            type="text"
                            id="name"
                            placeholder="Full Name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            className="placeholders"
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="message">Message:</label>
                        <textarea
                            className="placeholders"
                            id="message"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>

                        <button className="submitButton" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SaleCarDetails;
