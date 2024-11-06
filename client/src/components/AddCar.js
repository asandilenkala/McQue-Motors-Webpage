import React, { useState } from 'react';
import axios from 'axios';

const AddCar = ({ addCar }) => { 
  const [car, setCar] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    setCar({ ...car, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData object to send form data including image
    const formData = new FormData();
    formData.append('name', car.name);
    formData.append('description', car.description);
    formData.append('price', car.price);
    formData.append('image', car.image);

    try {
      // Send POST request to the API
      const response = await axios.post('http://localhost:5000/car/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if the response was successful before proceeding
      if (response.status === 201) {
        // Assuming the response contains the added car, you can pass it to the parent component
        addCar(response.data);

        // Alert Admin when adding a new car
        addCarAlert();

        // Reset form after submission
        setCar({ name: '', description: '', price: '', image: null });
      } else {
        console.error('Failed to add car. Server returned status:', response.status);
      }
    } catch (error) {
      console.error('Error uploading car data:', error);
    }
  };

  // Alert function to notify that the car has been added successfully
  const addCarAlert = () => {
    alert('Car added successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='inputBox'
        type="text"
        name="name"
        placeholder="Car Name"
        value={car.name}
        onChange={handleChange}
        required
      />
      <input
        className='inputBox'
        type="text"
        name="description"
        placeholder="Description"
        value={car.description}
        onChange={handleChange}
        required
      />
      <input
        className='inputBox'
        type="number"
        name="price"
        placeholder="Price in Rand"
        value={car.price}
        onChange={handleChange}
        required
      />
      <input
        className='inputBox'
        type="file"
        name="image"
        onChange={handleImageChange}
        required
      />
      <button className='registerButton' type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;
