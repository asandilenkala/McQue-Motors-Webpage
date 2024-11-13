import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import CarListDashboard from './CarListDashboard';
import rentedCars from './RentedCars';

const Dashboard = () => {
  const [cars, setCars] = useState([]); // Cars in sale.
  const [rentCars, setRentCars] = useState([]); // Cars in sale.
  const [activeForm, setActiveForm] = useState(''); // To track which form is active.
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    bodyType: '',
    transmission: 'Manual',
    fuelType: 'Petrol',
    mileage: '',
    engineSize: '',
    numberOfSeats: '',
    numberOfDoors: '',
    price: '',
    availabilityStatus: 'Available',
    description: '',
    image: null,
    registrationNumber: '',
    vin: '',
    warrantyDetails: '',
    condition: 'New',
  });
  const [rentCar, setRentCar] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    bodyType: '',
    transmission: 'Manual',
    fuelType: 'Petrol',
    mileage: '',
    engineSize: '',
    numberOfSeats: '',
    numberOfDoors: '',
    rentalPricePerDay: null,
    rentalPricePerWeek: null,
    rentalPricePerMonth: null,
    availabilityStatus: 'Available',
    description: '',
    image: '',
    registrationNumber: '',
    vin: '',
    condition: 'New',
    insuranceDetails: '',
    lastServicedDate: '',
  });
  const [carToUpdate, setCarToUpdate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch cars and messages on component mount
  useEffect(() => {
    fetchCars();
    fetchRentCars();
    fetchMessages();
  }, []);

  // Fetch sale cars from backend
  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/purchase/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

    // Fetch rent cars from backend
    const fetchRentCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rent/cars');
        setRentCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

  // Handle form input changes for adding/updating car
  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCar({ ...car, image: e.target.files[0] });
  };
  
  const handleRentImageChange = (e) => {
    setRentCar({...rentCar, image: e.target.files[0] });
  };

  // Handle adding sale car
  const handleAddCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(car).forEach(key => {
      formData.append(key, car[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/purchase/car/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        setCars([...cars, response.data]);
        alert('Car added successfully!');
        setCar({ ...car, image: null });
        setActiveForm('');
      }
    } catch (error) {
      console.error('Error uploading car data:', error);
    }
  };

   // Handle adding sale car
   const handleAddRentCar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(rentCar).forEach(key => {
      formData.append(key, rentCar[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/rent/car/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        setRentCars([...rentCars, response.data]);
        alert('Car added successfully!');
        setRentCar({ ...rentCar, image: null });
        setActiveForm('');
      }
    } catch (error) {
      console.error('Error uploading car data:', error);
    }
  };

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/clients');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async (messageId) => {
    console.log('Delete function triggered'); // Check if this logs
    const confirmation = window.alert('Are you sure you want to delete this message?');

    if (confirmation) {
        try {
            const response = await axios.delete(`http://localhost:5000/clients/${messageId}`);
            if (response.status === 200) {
                setMessages(messages.filter((message) => message.id !== messageId));
                alert('Message deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    } else {
        console.log('Delete canceled');
    }
};


  // Mark message as read/unread
  const handleToggleReadStatus = async (messageId) => {
    try {
      const messageToToggle = messages.find((message) => message.id === messageId);
      const response = await axios.put(`http://localhost:5000/clients/${messageId}`, {
        ...messageToToggle,
        read: !messageToToggle.read,
      });
      if (response.status === 200) {
        setMessages(messages.map((message) => (message.id === messageId ? response.data : message)));
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  // View a specific message
  const viewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Initialize navigate function
  const navigate = useNavigate();

  // Handle redirect to CarListDashboard
  const handleUpdateRedirect = () => {
    navigate('/CarListDashboard'); // Assuming the route is set up for CarListDashboard
  };

  // Handle redirect to CarListDashboard
  const handleClientProfileRedirect = () => {
    navigate('/rentedCars'); // Assuming the route is set up for CarListDashboard
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <div className="button-container">
        <button className="toggle-btn" onClick={() => setActiveForm('addSaleCar')}>Add Sale Car</button>
        <button className="toggle-btn" onClick={() => setActiveForm('addRentCar')}>Add Rent Car</button>
        <button className="toggle-btn" onClick={handleUpdateRedirect}>Update Car</button>
        <button className="toggle-btn" onClick={handleClientProfileRedirect}>Rented Cars</button>
        <button className="toggle-btn" onClick={() => setActiveForm('messages')}>View Messages</button>
      </div>

      {/* Add Sale Car Form */}
      {activeForm === 'addSaleCar' && (
        <div className="form-container form-3d">
          <h3>Add New Car</h3>
          <form onSubmit={handleAddCar}>
            <input className='inputBox' type="text" name="make" placeholder="Make" value={car.make} onChange={handleChange} required />
            <input className='inputBox' type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} required />
            <input className='inputBox' type="number" name="year" placeholder="Year" value={car.year} onChange={handleChange} required />
            <input className='inputBox' type="text" name="color" placeholder="Color" value={car.color} onChange={handleChange} required />
            <input className='inputBox' type="text" name="bodyType" placeholder="Body Type" value={car.bodyType} onChange={handleChange} required />
            <select className='inputBox' name="transmission" value={car.transmission} onChange={handleChange} required>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
            <select className='inputBox' name="fuelType" value={car.fuelType} onChange={handleChange} required>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <input className='inputBox' type="number" name="mileage" placeholder="Mileage" value={car.mileage} onChange={handleChange} required />
            <input className='inputBox' type="text" name="engineSize" placeholder="Engine Size" value={car.engineSize} onChange={handleChange} required />
            <input className='inputBox' type="number" name="numberOfSeats" placeholder="Number of Seats" value={car.numberOfSeats} onChange={handleChange} required />
            <input className='inputBox' type="number" name="numberOfDoors" placeholder="Number of Doors" value={car.numberOfDoors} onChange={handleChange} required />
            <input className='inputBox' type="number" name="price" placeholder="Price in Rand" value={car.price} onChange={handleChange} required />
            <select className='inputBox' name="availabilityStatus" value={car.availabilityStatus} onChange={handleChange} required>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Pending">Pending</option>
            </select>
            <textarea className='inputBox' name="description" placeholder="Description" value={car.description} onChange={handleChange} required />
            <input className='inputBox' type="text" name="registrationNumber" placeholder="Registration Number" value={car.registrationNumber} onChange={handleChange} required />
            <input className='inputBox' type="text" name="vin" placeholder="VIN" value={car.vin} onChange={handleChange} required />
            <textarea className='inputBox' name="warrantyDetails" placeholder="Warranty Details" value={car.warrantyDetails} onChange={handleChange} />
            <select className='inputBox' name="condition" value={car.condition} onChange={handleChange} required>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Certified Pre-Owned">Certified Pre-Owned</option>
            </select>
            <input className='inputBox' type="file" name="image" onChange={handleImageChange} required />
            <button className='registerButton' type="submit">Add Car</button>
          </form>
        </div>
      )}

      {/* Add Rent Car Form */}
      {activeForm === 'addRentCar' && (
        <div className="form-container form-3d">
          <h3>Add New Car</h3>
          <form onSubmit={handleAddRentCar}>
            <input className='inputBox' type="text" name="make" placeholder="Make" value={car.make} onChange={handleChange} required />
            <input className='inputBox' type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} required />
            <input className='inputBox' type="number" name="year" placeholder="Year" value={car.year} onChange={handleChange} required />
            <input className='inputBox' type="text" name="color" placeholder="Color" value={car.color} onChange={handleChange} required />
            <input className='inputBox' type="text" name="bodyType" placeholder="Body Type" value={car.bodyType} onChange={handleChange} required />
            <select className='inputBox' name="transmission" value={car.transmission} onChange={handleChange} required>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
            <select className='inputBox' name="fuelType" value={car.fuelType} onChange={handleChange} required>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <input className='inputBox' type="number" name="mileage" placeholder="Mileage" value={car.mileage} onChange={handleChange} required />
            <input className='inputBox' type="text" name="engineSize" placeholder="Engine Size" value={car.engineSize} onChange={handleChange} required />
            <input className='inputBox' type="number" name="numberOfSeats" placeholder="Number of Seats" value={car.numberOfSeats} onChange={handleChange} required />
            <input className='inputBox' type="number" name="numberOfDoors" placeholder="Number of Doors" value={car.numberOfDoors} onChange={handleChange} required />
            <select className='inputBox' name="availabilityStatus" value={car.availabilityStatus} onChange={handleChange} required>
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
            <textarea className='inputBox' name="description" placeholder="Description" value={car.description} onChange={handleChange} required />
            <input className='inputBox' type="text" name="registrationNumber" placeholder="Registration Number" value={car.registrationNumber} onChange={handleChange} required />
            <input className='inputBox' type="text" name="vin" placeholder="VIN" value={car.vin} onChange={handleChange} required />
            <textarea className='inputBox' name="insuranceDetails" placeholder="Insurance Details" value={car.insuranceDetails} onChange={handleChange} />
            <textarea className='inputBox' name="lastServicedDate" placeholder="Last Serviced Date" value={car.lastServicedDate} onChange={handleChange} />
            <select className='inputBox' name="condition" value={car.condition} onChange={handleChange} required>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Certified Pre-Owned">Certified Pre-Owned</option>
            </select>
            <input className='inputBox' type="file" name="image" onChange={handleRentImageChange} required />
            <button className='registerButton' type="submit">Add Car</button>
          </form>
        </div>
      )}


      {/* View Messages Section */}
      <div className="messages-container">
        {activeForm === 'messages' && (
          <div className="message-list-container">
            <div className="form-container form-3d">
              <h3>Messages From The Clients</h3>
              <div className="message-list">
                {messages
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort messages by date, newest first
                  .map((message) => (
                    <div key={message.id} className={`message-item ${message.read ? 'read' : 'unread'}`}>
                      <p><strong>From:</strong> {message.fullName} ({message.email})</p>
                      <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleDateString()} <strong>Time:</strong> {new Date(message.createdAt).toLocaleTimeString()}</p>
                      <button className="registerButton" onClick={() => viewMessage(message)}>View Message</button>
                      <button className="registerButton" onClick={() => handleToggleReadStatus(message.id)}>
                        Mark as {message.read ? 'Unread' : 'Read'}
                      </button>
                      <button className="registerButton" onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* View a specific message next to the list */}
            {selectedMessage && (
              <div className="message-details form-3d">
                <h3>Message Details</h3>
                <p><strong>From:</strong> {selectedMessage.fullName} ({selectedMessage.email})</p>
                <p><strong>Message:</strong> {selectedMessage.message}</p>
                <button className="registerButton" onClick={() => setSelectedMessage(null)}>Close</button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
