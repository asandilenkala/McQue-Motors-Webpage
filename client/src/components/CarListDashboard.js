import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate } from 'react-router-dom';

const CarListDashboard = () => {
  const { carId } = useParams(); // Get the car ID from the URL parameters
  const [cars, setPurchaseCars] = useState([]); // State to hold the list of cars
  const [rentCars, setRentCars] = useState([]); // State to hold the list of rent cars
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [activePage, setActivePage] = useState('selling-cars'); // State to handle the active page display
  const navigate = useNavigate(); // React Router navigation hook
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [showModal2, setShowModal2] = useState(false); // Modal visibility state for rent car
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

  // Fetch purchased cars from the API
  const fetchPurchaseCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/purchase/cars'); 
      setPurchaseCars(response.data); 
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // Fetch rent cars from the API
  const fetchRentCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rent/cars'); 
      setRentCars(response.data);
    } catch (error) {
      console.error('Error fetching rent cars:', error);
    }
  };

  // Fetch cars on component mount
  useEffect(() => {
    fetchPurchaseCars();
    fetchRentCars();
  }, [carId]);

  // Function to handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle switching between Buy Car and Rent Car
  const handlePageSwitch = (page) => {
    setActivePage(page);
  };

  // Navigate to car details page
  const showSaleCarDetails = (carId) => {
    navigate(`/purchase/cars/${carId}`); // Pass the car ID in the URL
  };

  const showRentCarDetails = (carId) => {
    navigate(`/rent/cars/${carId}`); // Pass the car ID in the URL
  };

  const deleteSaleCar = async (carId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this car?");
      if (!confirmDelete) {
        return; // Exit if the user cancels the deletion
      }
  
      const response = await axios.delete(`http://localhost:5000/purchase/car/delete/${carId}`); 
      setPurchaseCars(response.data);
      alert("Car deleted successfully!"); // Success alert
    } catch (error) {
      console.error('Error deleting the car:', error);
      alert("There was an error deleting the car. Please try again."); // Error alert
    }
  };
  

  const deleteRentCar = async (carId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this car?");
      if (!confirmDelete) {
        return; // Exit if the user cancels the deletion
      }
  
      const response = await axios.delete(`http://localhost:5000/rent/car/delete/${carId}`); 
      setRentCars(response.data);
      alert("Car deleted successfully!"); // Success alert
    } catch (error) {
      console.error('Error deleting the car:', error);
      alert("There was an error deleting the car. Please try again."); // Error alert
    }
  };


  const CarEditForm = ({ car, setCar, saveChanges, closeModal }) => (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Sales Car Details</h2>
        {/* Input fields for each car property */}
        <input
          type="text"
          value={car.make}
          onChange={(e) => setCar({ ...car, make: e.target.value })}
          placeholder="Make"
        />
        <input
          type="text"
          value={car.model}
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          placeholder="Model"
        />
        <input
          type="number"
          value={car.year}
          onChange={(e) => setCar({ ...car, year: e.target.value })}
          placeholder="Year"
        />
        <input
          type="text"
          value={car.color}
          onChange={(e) => setCar({ ...car, color: e.target.value })}
          placeholder="Color"
        />
        <input
          type="text"
          value={car.bodyType}
          onChange={(e) => setCar({ ...car, bodyType: e.target.value })}
          placeholder="Body Type"
        />
        <select
          type="text"
          value={car.transmission}
          onChange={(e) => setCar({ ...car, transmission: e.target.value })}
        />
        <select
          type="text"
          value={car.fuelType}
          onChange={(e) => setCar({ ...car, fuelType: e.target.value })}
        />
        <input
          type="number"
          value={car.mileage}
          onChange={(e) => setCar({ ...car, mileage: e.target.value })}
          placeholder="Mileage"
        />
        <input
          type="text"
          value={car.engineSize}
          onChange={(e) => setCar({ ...car, engineSize: e.target.value })}
          placeholder="Engine Size"
        />
        <input
          type="number"
          value={car.numberOfSeats}
          onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })}
          placeholder="Number of Seats"
        />
        <input
          type="number"
          value={car.numberOfDoors}
          onChange={(e) => setCar({ ...car, numberOfDoors: e.target.value })}
          placeholder="Number of Doors"
        />
        <input
          type="number"
          value={car.price}
          onChange={(e) => setCar({ ...car, price: e.target.value })}
          placeholder="Price in Rand"
        />
        <select
          type="text"
          value={car.availabilityStatus}
          onChange={(e) => setCar({ ...car, availabilityStatus: e.target.value })}
          placeholder="Availability Status"
        />
        <textarea
          type="text"
          value={car.description}
          onChange={(e) => setCar({ ...car, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="text"
          value={car.registrationNumber}
          onChange={(e) => setCar({ ...car, registrationNumber: e.target.value })}
          placeholder="Registration Number"
        />
        <input
          type="text"
          value={car.vin}
          onChange={(e) => setCar({ ...car, vin: e.target.value })}
          placeholder="VIN"
        />
        <input
          type="text"
          value={car.warrantyDetails}
          onChange={(e) => setCar({ ...car, warrantyDetails: e.target.value })}
          placeholder="Warranty Details"
        />
        <select
          type="text"
          value={car.condition}
          onChange={(e) => setCar({ ...car, condition: e.target.value })}
        />
        <button onClick={saveChanges}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );  

  const CarEditFormRent = ({ rentCar, setRentCar, saveChanges2, closeModal2 }) => (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Rent Car Details</h2>
        {/* Input fields for each car property */}
        <input
          type="text"
          value={rentCar.make}
          onChange={(e) => setRentCar({ ...rentCar, make: e.target.value })}
          placeholder="Make"
        />
        <input
          type="text"
          value={rentCar.model}
          onChange={(e) => setRentCar({ ...rentCar, model: e.target.value })}
          placeholder="Model"
        />
        <input
          type="number"
          value={rentCar.year}
          onChange={(e) => setRentCar({ ...rentCar, year: e.target.value })}
          placeholder="Year"
        />
        <input
          type="text"
          value={rentCar.color}
          onChange={(e) => setRentCar({ ...rentCar, color: e.target.value })}
          placeholder="Color"
        />
        <input
          type="text"
          value={rentCar.bodyType}
          onChange={(e) => setRentCar({ ...rentCar, bodyType: e.target.value })}
          placeholder="Body Type"
        />
        <select
          type="text"
          value={rentCar.transmission}
          onChange={(e) => setRentCar({ ...rentCar, transmission: e.target.value })}
        />
        <select
          type="text"
          value={rentCar.fuelType}
          onChange={(e) => setRentCar({ ...rentCar, fuelType: e.target.value })}
        />
        <input
          type="number"
          value={rentCar.mileage}
          onChange={(e) => setRentCar({ ...rentCar, mileage: e.target.value })}
          placeholder="Mileage"
        />
        <input
          type="text"
          value={rentCar.engineSize}
          onChange={(e) => setRentCar({ ...rentCar, engineSize: e.target.value })}
          placeholder="Engine Size"
        />
        <input
          type="number"
          value={rentCar.numberOfSeats}
          onChange={(e) => setRentCar({ ...rentCar, numberOfSeats: e.target.value })}
          placeholder="Number of Seats"
        />
        <input
          type="number"
          value={rentCar.numberOfDoors}
          onChange={(e) => setCar({ ...rentCar, numberOfDoors: e.target.value })}
          placeholder="Number of Doors"
        />
        <select
          type="text"
          value={rentCar.availabilityStatus}
          onChange={(e) => setRentCar({ ...rentCar, availabilityStatus: e.target.value })}
          placeholder="Availability Status"
        />
        <textarea
          type="text"
          value={rentCar.description}
          onChange={(e) => setRentCar({ ...rentCar, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="text"
          value={rentCar.registrationNumber}
          onChange={(e) => setRentCar({ ...rentCar, registrationNumber: e.target.value })}
          placeholder="Registration Number"
        />
        <input
          type="text"
          value={rentCar.vin}
          onChange={(e) => setRentCar({ ...rentCar, vin: e.target.value })}
          placeholder="VIN"
        />
        <textarea
          type="text"
          value={rentCar.insuranceDetails}
          onChange={(e) => setRentCar({ ...rentCar, insuranceDetails: e.target.value })}
          placeholder="Insurance Details"
        />
        <textarea
          type="text"
          value={rentCar.lastServicedDate}
          onChange={(e) => setRentCar({ ...rentCar, lastServicedDate: e.target.value })}
          placeholder="Last Serviced Details"
        />
        <select
          type="text"
          value={rentCar.condition}
          onChange={(e) => setRentCar({ ...rentCar, condition: e.target.value })}
        />
        <button onClick={saveChanges2}>Save</button>
        <button onClick={closeModal2}>Cancel</button>
      </div>
    </div>
  );

  const openModal = (car) => {
    setCar(car); // Set the current car details
    setShowModal(true); // Show modal
  };

  const openModal2 = (rentCar) => {
    setRentCar(rentCar); // Set the current car details
    setShowModal2(true); // Show modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide modal
  };

  const closeModal2 = () => {
    setShowModal2(false); // Hide modal
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/purchase/car/update/${car._id}`, car);
      setPurchaseCars(response.data); // Update the list of cars with updated data
      setShowModal(false); // Close the modal after saving
      alert("Car updated successfully!");
    } catch (error) {
      console.error('Error updating the car:', error);
      alert("There was an error updating the car. Please try again.");
    }
  };

  const saveChanges2 = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/rent/car/update/${car._id}`, rentCar);
      setRentCars(response.data); // Update the list of cars with updated data
      setShowModal2(false); // Close the modal after saving
      alert("Car updated successfully!");
    } catch (error) {
      console.error('Error updating the car:', error);
      alert("There was an error updating the car. Please try again.");
    }
  };


  // Filter cars based on the search term
  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRentCars = rentCars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navigation Bar with Buy Car and Rent Car Buttons */}
      <div className='car-list-nav'>
        <button
          className={`nav-button ${activePage === 'selling-cars' ? 'active' : ''}`}
          onClick={() => handlePageSwitch('selling-cars')}
        >
          Buy Car
        </button>
        <button
          className={`nav-button ${activePage === 'renting-cars' ? 'active' : ''}`}
          onClick={() => handlePageSwitch('renting-cars')}
        >
          Rent Car
        </button>
      </div>

      {/* Selling Cars Section */}
      {activePage === 'selling-cars' && (
        <div className='selling-cars'>
          <div className="car-list">
            <h2>Buy Car</h2>
            <div className="filter-container">
              <input
                type="text"
                placeholder="Search for cars..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
              />
            </div>
            <div className="item-wrapper">
              {filteredCars.length === 0 ? (
                <p>No cars available.</p>
              ) : (
                filteredCars.map((car, index) => (
                  <button
                    key={index}
                    className="item-card"
                    //onClick={() => showSaleCarDetails(car._id)} // Call showCarDetails with car ID
                  >
                    <img className="item-img" src={`http://localhost:5000${car.image?.[0]}`} alt={car.make} />
                    <div className="item-details">
                      <div className="item-name">
                        <h4>{car.make}</h4>
                        <p className="price">R{car.price}</p>
                        <button onClick={() => openModal(car)} >edit</button>
                        <button onClick={() => deleteSaleCar(car._id)} >delete</button>
                      </div>
                      {/* Show modal if showModal is true */}
                        {showModal && (
                            <CarEditForm
                            car={car}
                            setCar={setCar}
                            saveChanges={saveChanges}
                            closeModal={closeModal}
                            />
                        )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}


      {/* Renting Cars Section */}
      {activePage === 'renting-cars' && (
        <div className='renting-cars'>
          <div className="car-list">
            <h2>Rent Cars</h2>
            <div className="filter-container">
              <input
                type="text"
                placeholder="Search for cars..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
              />
            </div>
            <div className="item-wrapper">
              {filteredRentCars.length === 0 ? (
                <p>No cars available.</p>
              ) : (
                filteredRentCars.map((car, index) => (
                  <button
                    key={index}
                    className="item-card"
                    >
                    <img className="item-img" src={`http://localhost:5000${car.image?.[0]}`} alt={car.make} />
                    <div className="item-details">
                      <div className="item-name">
                        <h4>{car.make}</h4>
                        <button onClick={() => openModal2(rentCar)} >edit</button>
                        <button onClick={() => deleteRentCar(car._id)} >delete</button>
                      </div>
                      {/* Show modal if showModal is true */}
                      {showModal2 && (
                            <CarEditFormRent
                            rentCar={rentCar}
                            setRentCar={setRentCar}
                            saveChanges2={saveChanges2}
                            closeModal2={closeModal2}
                            />
                        )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarListDashboard;
