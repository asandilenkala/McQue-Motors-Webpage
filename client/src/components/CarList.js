import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarList = () => {
  const [cars, setPurchaseCars] = useState([]); // State to hold the list of cars
  const [rentCars, setRentCars] = useState([]); // State to hold the list of rent cars
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [activePage, setActivePage] = useState('selling-cars'); // State to handle the active page display
  const navigate = useNavigate(); // React Router navigation hook

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
  }, []);

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


//'/rent/cars/:carId'
  // Filter cars based on the search term
  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRentCars = rentCars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='car-list-container'>
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
                  onClick={() => showSaleCarDetails(car._id)}
                >
                  {/* Safely access the first image or fallback */}
                  <img
                    src={`http://localhost:5000${car.image?.[0]}`}
                    alt={`Car ${index + 1}`}
                    className="car-image"
                  />
                  <div className="item-details">
                    <div className="item-name">
                      <h4>{car.make}</h4>
                      <p className="price">R{car.price}</p>
                    </div>
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
                    onClick={() => showRentCarDetails(car._id)} // Call showCarDetails with car ID
                  >
                    <img
                    src={`http://localhost:5000${car.image?.[0]}`}
                    alt={`Car ${index + 1}`}
                    className="car-image"
                  />
                    <div className="item-details">
                      <div className="item-name">
                        <h4>{car.make}</h4>
                        {/* <p className="price">R{car.price}</p> */}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default CarList;
