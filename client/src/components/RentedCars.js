import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentedCars = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    ID_File: null,
    carID: '',
    fromDate: '',
    toDate: '',
    price: ''
  });

  // Fetch all rented cars when the component mounts
  useEffect(() => {
    fetchRentedCars();
  }, []);

  // Function to get all rented cars
  const fetchRentedCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/show/rented/carsDetails');
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching rented cars:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'ID_File') {
      setFormData({ ...formData, ID_File: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form data to upload rented car details
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('fullname', formData.fullname);
    formDataObj.append('email', formData.email);
    formDataObj.append('phoneNumber', formData.phoneNumber);
    formDataObj.append('ID_File', formData.ID_File);
    formDataObj.append('carID', formData.carID);
    formDataObj.append('fromDate', formData.fromDate);
    formDataObj.append('toDate', formData.toDate);
    formDataObj.append('price', formData.price);

    try {
      await axios.post('http://localhost:5000/upload/rented/carsDetails', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchRentedCars(); // Refresh the car list
      setFormData({
        fullname: '',
        email: '',
        phoneNumber: '',
        ID_File: null,
        carID: '',
        fromDate: '',
        toDate: '',
        price: ''
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error uploading rented car:", error);
    }
  };

  // Delete rented car by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/rented/carsDetails/${id}`);
      fetchRentedCars(); // Refresh the car list after deletion
    } catch (error) {
      console.error("Error deleting rented car:", error);
    }
  };

  return (
    <div>
      <h1>Rented Cars</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Rented Car'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="ID_File"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="carID"
            placeholder="Car ID"
            value={formData.carID}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="fromDate"
            placeholder="From Date"
            value={formData.fromDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="toDate"
            placeholder="To Date"
            value={formData.toDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Upload Rented Car</button>
        </form>
      )}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>ID File</th>
            <th>Car ID</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.fullname}</td>
              <td>{car.email}</td>
              <td>{car.phoneNumber}</td>
              <td><a href={`http://localhost:5000/${car.ID_File}`}  target="_blank" rel="noopener noreferrer">View ID</a></td>
              <td>{car.carID}</td>
              <td>{car.fromDate}</td>
              <td>{car.toDate}</td>
              <td>{car.price}</td>
              <td>
                <button onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentedCars;
