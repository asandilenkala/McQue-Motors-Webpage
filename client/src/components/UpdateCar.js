import React, { useState } from 'react';
import axios from 'axios';

const UpdateCar = ({ car, updateCar }) => {
  const [updatedCar, setUpdatedCar] = useState({
    name: car.name,
    description: car.description,
    price: car.price,
    image: car.image,
  });

  // Handle text input changes
  const handleChange = (e) => {
    setUpdatedCar({ ...updatedCar, [e.target.name]: e.target.value });
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    setUpdatedCar({ ...updatedCar, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData object to send updated form data including image
    const formData = new FormData();
    formData.append('name', updatedCar.name);
    formData.append('description', updatedCar.description);
    formData.append('price', updatedCar.price);
    if (updatedCar.image instanceof File) {
      formData.append('image', updatedCar.image);
    }

    try {
      // Send PUT request to update car data
      const response = await axios.put(`http://localhost:5000/car/update/${car.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if the response was successful before proceeding
      if (response.status === 200) {
        updateCar(response.data); // Pass the updated car data to the parent component
        alert('Car updated successfully!');
      } else {
        console.error('Failed to update car. Server returned status:', response.status);
      }
    } catch (error) {
      console.error('Error updating car data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='inputBox'
        type="text"
        name="name"
        placeholder="Car Name"
        value={updatedCar.name}
        onChange={handleChange}
        required
      />
      <input
        className='inputBox'
        type="text"
        name="description"
        placeholder="Description"
        value={updatedCar.description}
        onChange={handleChange}
        required
      />
      <input
        className='inputBox'
        type="number"
        name="price"
        placeholder="Price in Rand"
        value={updatedCar.price}
        onChange={handleChange}
        required
      />
      <input
        className='inputBox'
        type="file"
        name="image"
        onChange={handleImageChange}
      />
      <button className='registerButton' type="submit">Update Car</button>
    </form>
  );
};

export default UpdateCar;
