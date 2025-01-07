import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const SaleCarDetails = () => {
    const { carId } = useParams(); // Get the car ID from the URL parameters
    const [car, setCar] = useState(null); // State to store car details
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Function to fetch car details based on car ID
    const fetchCarDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/purchase/car/${carId}`); // Fetch specific car data from the API
            setCar(response.data); // Store the fetched car details in the state
        } catch (error) {
            console.error('Error fetching car details:', error);
        }
    };

    const collectData = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
    
        try {
            const messageWithCarId = `[Sale Car ID => ${carId}] : ${message}`; // Prepend carId to the message
            console.warn(fullname, email, messageWithCarId);
    
            let result = await fetch("http://localhost:5000/clients", {
                method: "POST",
                body: JSON.stringify({ fullname, email, message: messageWithCarId }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (result.ok) {
                let data = await result.json();
                console.warn(data);
                alert('Message Sent Successfully!');
                navigate('/'); // Redirect the user on success
            } else {
                console.error(`Error: ${result.statusText} (${result.status})`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Fetch car details when the component mounts
    useEffect(() => {
        fetchCarDetails();
    }, [carId]);

    // Function to go back to the previous page (CarList)
    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    // Display loader while data is being fetched
    if (!car) {
        return <p>Loading car details...</p>;
    }

    return (
        <div className="car-details-container">
            <button onClick={goBack} className="back-button">Back to Car List</button>
            <div className="car-details-card">

                {/* Swiper Image Gallery */}
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    modules={[Navigation]}
                    className="car-image-swiper"
                >
                    {car.image.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={`http://localhost:5000/${car.image}`} alt={`Car ${index + 1}`} className="car-image" />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <p className='price'><strong>Price:</strong> R{car.price}</p>
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

                {/* Contact Section */}
                <div className="contact">
                    <h1>Contact Us</h1>
                    <form className="contact-form" onSubmit={collectData}>
                        <label htmlFor="name">Full Name:</label>
                        <input className="placeholders" type="text" id="name" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />

                        <label htmlFor="email">Email:</label>
                        <input className="placeholders" type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label htmlFor="message">Message:</label>
                        <textarea className="placeholders" id="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

                        <button className='submitButton' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SaleCarDetails;
