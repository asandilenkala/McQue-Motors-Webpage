import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CarListDashboard = () => {
  const { carId } = useParams();
  const [purchaseCars, setPurchaseCars] = useState([]); // Renamed for clarity
  const [rentCars, setRentCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState('selling-cars');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [currentCarForSale, setCurrentCarForSale] = useState(null); // To store the car being edited (sale)
  const [currentRentCar, setCurrentRentCar] = useState(null); // To store the car being edited (rent)

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
  }, [carId]); // carId might be redundant here if not directly used for initial fetch

  // Function to handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle switching between Buy Car and Rent Car
  const handlePageSwitch = (page) => {
    setActivePage(page);
    setSearchTerm(''); // Clear search when switching pages
  };

  // Navigate to car details page (if needed, currently commented out in JSX)
  const showSaleCarDetails = (carId) => {
    navigate(`/purchase/cars/${carId}`);
  };

  const showRentCarDetails = (carId) => {
    navigate(`/rent/cars/${carId}`);
  };

  const deleteSaleCar = async (carIdToDelete) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this car?");
      if (!confirmDelete) {
        return; // Exit if the user cancels the deletion
      }

      await axios.delete(`http://localhost:5000/purchase/car/delete/${carIdToDelete}`);
      setPurchaseCars(prevCars => prevCars.filter(car => car._id !== carIdToDelete)); // Optimistic update
      alert("Car deleted successfully!");
    } catch (error) {
      console.error('Error deleting the car:', error);
      alert("There was an error deleting the car. Please try again.");
    }
  };

  const deleteRentCar = async (carIdToDelete) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this car?");
      if (!confirmDelete) {
        return;
      }

      await axios.delete(`http://localhost:5000/rent/car/delete/${carIdToDelete}`);
      setRentCars(prevCars => prevCars.filter(car => car._id !== carIdToDelete)); // Optimistic update
      alert("Car deleted successfully!");
    } catch (error) {
      console.error('Error deleting the car:', error);
      alert("There was an error deleting the car. Please try again.");
    }
  };

  // Car Edit Form for Sale Cars
  const CarEditForm = ({ car, saveChanges, closeModal }) => {
    // Local state for the form, initialized with the car prop
    const [editedCar, setEditedCar] = useState(car);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedCar(prevCar => ({
        ...prevCar,
        [name]: value
      }));
    };

    const handleSave = () => {
      saveChanges(editedCar);
    };

    return (
      <div className="modal">
        <div className="edit-form">
          <h1>Edit Sales Car</h1>
          {/* Input fields for each car property, using editedCar and handleChange */}
          <input
            type="text"
            name="make"
            value={editedCar.make}
            onChange={handleChange}
            placeholder="Make"
          />
          <input
            type="text"
            name="model"
            value={editedCar.model}
            onChange={handleChange}
            placeholder="Model"
          />
          <input
            type="number"
            name="year"
            value={editedCar.year}
            onChange={handleChange}
            placeholder="Year"
          />
          <input
            type="text"
            name="color"
            value={editedCar.color}
            onChange={handleChange}
            placeholder="Color"
          />
          <input
            type="text"
            name="bodyType"
            value={editedCar.bodyType}
            onChange={handleChange}
            placeholder="Body Type"
          />
          <select
            name="transmission"
            value={editedCar.transmission}
            onChange={handleChange}
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <select
            name="fuelType"
            value={editedCar.fuelType}
            onChange={handleChange}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <input
            type="number"
            name="mileage"
            value={editedCar.mileage}
            onChange={handleChange}
            placeholder="Mileage"
          />
          <input
            type="text"
            name="engineSize"
            value={editedCar.engineSize}
            onChange={handleChange}
            placeholder="Engine Size"
          />
          <input
            type="number"
            name="numberOfSeats"
            value={editedCar.numberOfSeats}
            onChange={handleChange}
            placeholder="Number of Seats"
          />
          <input
            type="number"
            name="numberOfDoors"
            value={editedCar.numberOfDoors}
            onChange={handleChange}
            placeholder="Number of Doors"
          />
          <input
            type="number"
            name="price"
            value={editedCar.price}
            onChange={handleChange}
            placeholder="Price in Rand"
          />
          <select
            name="availabilityStatus"
            value={editedCar.availabilityStatus}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Reserved">Reserved</option>
          </select>
          <textarea
            name="description"
            value={editedCar.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="registrationNumber"
            value={editedCar.registrationNumber}
            onChange={handleChange}
            placeholder="Registration Number"
          />
          <input
            type="text"
            name="vin"
            value={editedCar.vin}
            onChange={handleChange}
            placeholder="VIN"
          />
          <input
            type="text"
            name="warrantyDetails"
            value={editedCar.warrantyDetails}
            onChange={handleChange}
            placeholder="Warranty Details"
          />
          <select
            name="condition"
            value={editedCar.condition}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    );
  };

  // Car Edit Form for Rent Cars
  const CarEditFormRent = ({ rentCar, saveChanges2, closeModal2 }) => {
    // Local state for the form, initialized with the rentCar prop
    const [editedRentCar, setEditedRentCar] = useState(rentCar);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedRentCar(prevRentCar => ({
        ...prevRentCar,
        [name]: value
      }));
    };

    const handleSave = () => {
      saveChanges2(editedRentCar);
    };

    return (
      <div className="modal">
        <div className="edit-form">
          <h1>Edit Rent Car</h1>
          {/* Input fields for each car property */}
          <input
            type="text"
            name="make"
            value={editedRentCar.make}
            onChange={handleChange}
            placeholder="Make"
          />
          <input
            type="text"
            name="model"
            value={editedRentCar.model}
            onChange={handleChange}
            placeholder="Model"
          />
          <input
            type="number"
            name="year"
            value={editedRentCar.year}
            onChange={handleChange}
            placeholder="Year"
          />
          <input
            type="text"
            name="color"
            value={editedRentCar.color}
            onChange={handleChange}
            placeholder="Color"
          />
          <input
            type="text"
            name="bodyType"
            value={editedRentCar.bodyType}
            onChange={handleChange}
            placeholder="Body Type"
          />
          <select
            name="transmission"
            value={editedRentCar.transmission}
            onChange={handleChange}
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <select
            name="fuelType"
            value={editedRentCar.fuelType}
            onChange={handleChange}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <input
            type="number"
            name="mileage"
            value={editedRentCar.mileage}
            onChange={handleChange}
            placeholder="Mileage"
          />
          <input
            type="text"
            name="engineSize"
            value={editedRentCar.engineSize}
            onChange={handleChange}
            placeholder="Engine Size"
          />
          <input
            type="number"
            name="numberOfSeats"
            value={editedRentCar.numberOfSeats}
            onChange={handleChange}
            placeholder="Number of Seats"
          />
          <input
            type="number"
            name="numberOfDoors"
            value={editedRentCar.numberOfDoors}
            onChange={handleChange}
            placeholder="Number of Doors"
          />
          <input
            type="number"
            name="rentalPricePerDay"
            value={editedRentCar.rentalPricePerDay || ''} // Handle null initial value
            onChange={handleChange}
            placeholder="Rental Price Per Day"
          />
          <input
            type="number"
            name="rentalPricePerWeek"
            value={editedRentCar.rentalPricePerWeek || ''}
            onChange={handleChange}
            placeholder="Rental Price Per Week"
          />
          <input
            type="number"
            name="rentalPricePerMonth"
            value={editedRentCar.rentalPricePerMonth || ''}
            onChange={handleChange}
            placeholder="Rental Price Per Month"
          />
          <select
            name="availabilityStatus"
            value={editedRentCar.availabilityStatus}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <textarea
            name="description"
            value={editedRentCar.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="registrationNumber"
            value={editedRentCar.registrationNumber}
            onChange={handleChange}
            placeholder="Registration Number"
          />
          <input
            type="text"
            name="vin"
            value={editedRentCar.vin}
            onChange={handleChange}
            placeholder="VIN"
          />
          <textarea
            name="insuranceDetails"
            value={editedRentCar.insuranceDetails}
            onChange={handleChange}
            placeholder="Insurance Details"
          />
          <input
            type="date" // Changed to type="date" for date input
            name="lastServicedDate"
            value={editedRentCar.lastServicedDate ? editedRentCar.lastServicedDate.substring(0, 10) : ''} // Format date for input
            onChange={handleChange}
            placeholder="Last Serviced Date"
          />
          <select
            name="condition"
            value={editedRentCar.condition}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={closeModal2}>Cancel</button>
        </div>
      </div>
    );
  };

  const openModal = (carToEdit) => {
    setCurrentCarForSale(carToEdit); // Set the current car details
    setShowModal(true); // Show modal
  };

  const openModal2 = (rentCarToEdit) => {
    setCurrentRentCar(rentCarToEdit); // Set the current rent car details
    setShowModal2(true); // Show modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide modal
    setCurrentCarForSale(null); // Clear the car being edited
  };

  const closeModal2 = () => {
    setShowModal2(false); // Hide modal
    setCurrentRentCar(null); // Clear the rent car being edited
  };

  const saveChanges = async (updatedCar) => {
    try {
      const response = await axios.put(`http://localhost:5000/purchase/car/update/${updatedCar._id}`, updatedCar);
      // Update the specific car in the list
      setPurchaseCars(prevCars => prevCars.map(car =>
        car._id === updatedCar._id ? response.data : car
      ));
      setShowModal(false);
      setCurrentCarForSale(null);
      alert("Car updated successfully!");
    } catch (error) {
      console.error('Error updating the car:', error);
      alert("There was an error updating the car. Please try again.");
    }
  };

  const saveChanges2 = async (updatedRentCar) => {
    try {
      // Corrected: Use updatedRentCar._id
      const response = await axios.put(`http://localhost:5000/rent/car/update/${updatedRentCar._id}`, updatedRentCar);
      // Update the specific rent car in the list
      setRentCars(prevCars => prevCars.map(car =>
        car._id === updatedRentCar._id ? response.data : car
      ));
      setShowModal2(false);
      setCurrentRentCar(null);
      alert("Rent car updated successfully!");
    } catch (error) {
      console.error('Error updating the rent car:', error);
      alert("There was an error updating the rent car. Please try again.");
    }
  };

  // Filter cars based on the search term
  const filteredCars = purchaseCars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(car.year).includes(searchTerm) // Also allow searching by year
  );
  const filteredRentCars = rentCars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(car.year).includes(searchTerm)
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
            <h2>Buy Cars Available</h2>
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
                <p>No cars available matching your search.</p>
              ) : (
                filteredCars.map((car) => (
                  <div key={car._id} className="item-card">
                    <img className="item-img" src={`http://localhost:5000${car.image?.[0]}`} alt={car.make} />
                    <div className="item-details">
                      <div className="item-name">
                        <h4>{car.make} {car.model} ({car.year})</h4>
                        <p className="price">R{car.price}</p>
                        <button onClick={() => openModal(car)}>Edit</button>
                        <button onClick={() => deleteSaleCar(car._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
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
            <h2>Rent Cars Available</h2>
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
                <p>No rent cars available matching your search.</p>
              ) : (
                filteredRentCars.map((rentCar) => ( // Changed 'car' to 'rentCar' for clarity
                  <div key={rentCar._id} className="item-card">
                    <img className="item-img" src={`http://localhost:5000${rentCar.image?.[0]}`} alt={rentCar.make} />
                    <div className="item-details">
                      <div className="item-name">
                        <h4>{rentCar.make} {rentCar.model} ({rentCar.year})</h4>
                        <p className="price">R{rentCar.rentalPricePerDay}/day</p>
                        <button onClick={() => openModal2(rentCar)}>Edit</button>
                        <button onClick={() => deleteRentCar(rentCar._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sales Car Edit Modal */}
      {showModal && currentCarForSale && (
        <CarEditForm
          car={currentCarForSale}
          saveChanges={saveChanges}
          closeModal={closeModal}
        />
      )}

      {/* Rent Car Edit Modal */}
      {showModal2 && currentRentCar && (
        <CarEditFormRent
          rentCar={currentRentCar}
          saveChanges2={saveChanges2}
          closeModal2={closeModal2}
        />
      )}
    </>
  );
};

export default CarListDashboard;