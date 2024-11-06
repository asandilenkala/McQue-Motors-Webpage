import React from 'react';
import axios from 'axios';

const DeleteCar = ({ carId, removeCar }) => {
  // Function to handle the delete operation
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        // Send DELETE request to the server to remove the car
        const response = await axios.delete(`http://localhost:5000/car/delete/${carId}`);

        // Check if the response was successful before proceeding
        if (response.status === 200) {
          removeCar(carId); // Notify the parent component to remove the car from the state
          alert('Car deleted successfully!');
        } else {
          console.error('Failed to delete car. Server returned status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  return (
    <button className='registerButton' onClick={handleDelete}>
      Delete Car
    </button>
  );
};

export default DeleteCar;
