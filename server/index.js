const express = require('express');
const cors = require('cors');
const path = require('path');
require('./model/model');
const Client = require('./model/Client');
// const Admin = require('./model/Admin');
const SaleCar = require('./model/SaleCars');
const RentCar = require('./model/RentCars');
const ClientRenting = require('./model/ClientRenting');
const adminRoutes = require('./routes/adminRoutes')
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
app.use('/admin', adminRoutes);

// Set up multer for file uploads
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: fileStorage });

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));


// Create a new client and send an email
app.post('/clients', async (req, res) => {
    try {
        const { fullname, email, message } = req.body;

        // Save client data to the database
        const newClient = new Client({ fullname, email, message });
        await newClient.save();
    } catch (error) {
        res.status(500).json({ message: 'Error saving client data', error });
    }
});

// Get all clients
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving clients', error });
    }
});

// Get a single client by ID
app.get('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving client', error });
    }
});

// Update a client by ID
app.put('/clients/:id', async (req, res) => {
    try {
        const { fullname, email, message } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { fullname, email, message },
            { new: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json({ message: 'Client updated successfully', client: updatedClient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating client', error });
    }
});

// Delete a client by ID
app.delete('/clients/:id', async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting client', error });
    }
});



// Get all available purchase cars for sale
app.get('/purchase/cars', async (req, res) => {
  try {
    const cars = await SaleCar.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cars", error });
  }
});

// Get all available rent cars for sale
app.get('/rent/cars', async (req, res) => {
  try {
    const cars = await RentCar.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cars", error });
  }
});

// Get purchase car details by ID
app.get('/purchase/car/:id', async (req, res) => {
  try {
    const car = await SaleCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    res.json(car);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
});

// Get rent car details by ID
app.get('/rent/car/:id', async (req, res) => {
  try {
    const car = await RentCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    res.json(car);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
});

// Add new purchase car for sale (with image upload)
app.post('/purchase/car/upload', upload.array('image', 10), async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No image files uploaded.");
    }

    // Map through the files to get their paths
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const newCar = new SaleCar({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      bodyType: req.body.bodyType,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      mileage: req.body.mileage,
      engineSize: req.body.engineSize,
      numberOfSeats: req.body.numberOfSeats,
      numberOfDoors: req.body.numberOfDoors,
      price: req.body.price,
      availabilityStatus: req.body.availabilityStatus,
      description: req.body.description,
      image: images, // Save the array of image paths
      registrationNumber: req.body.registrationNumber,
      vin: req.body.vin,
      warrantyDetails: req.body.warrantyDetails,
      condition: req.body.condition,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });

    // Save the car details in the database
    const carUpload = await newCar.save();
    res.status(201).send({ message: "Car uploaded successfully", car: carUpload });
  } catch (err) {
    console.error("Error uploading the car:", err);
    res.status(500).send("Failed to upload car details.");
  }
});


// Add new rent car for sale (with image upload)
app.post('/rent/car/upload', upload.array('image', 10), async (req, res) => {
  try {
    if (!req.file || req.files.length === 0) {
      return res.status(400).send("No image file uploaded.");
    }

    // Map through the files to get their paths
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const newCar = new RentCar({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      bodyType: req.body.bodyType,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      mileage: req.body.mileage,
      engineSize: req.body.engineSize,
      numberOfSeats: req.body.numberOfSeats,
      numberOfDoors: req.body.numberOfDoors,
      rentalPricePerDay: req.body.rentalPricePerDay,
      rentalPricePerWeek: req.body.rentalPricePerWeek,
      rentalPricePerMonth: req.body.rentalPricePerMonth,
      currentRenter: req.body.currentRenter,
      rentalStartDate: req.body.rentalStartDate,
      rentalEndDate: req.body.rentalEndDate,
      availabilityStatus: req.body.availabilityStatus,
      description: req.body.description,
      image: images,
      registrationNumber: req.body.registrationNumber,
      vin: req.body.vin,
      condition: req.body.condition,
      insuranceDetails: req.body.insuranceDetails,
      lastServicedDate: req.body.lastServicedDate,
    });

    const carUpload = await newCar.save();
    res.status(201).send({ message: "Car uploaded successfully", car: carUpload });
  } catch (err) {
    console.error("Error uploading the car:", err);
    res.status(500).send("Failed to upload car details.");
  }
});

// Update purchase car by ID
app.put('/purchase/car/update/:id', async (req, res) => {
  try {
    const updatedCar = await SaleCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the car', details: err.message });
  }
});

// Update rent car by ID
app.put('/rent/car/update/:id', async (req, res) => {
  try {
    const updatedCar = await RentCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating the car', details: err.message });
  }
});

// Delete purchase car by ID
app.delete('/purchase/car/delete/:id', async (req, res) => {
  try {
    const car = await SaleCar.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete rent car by ID
app.delete('/rent/car/delete/:id', async (req, res) => {
  try {
    const car = await RentCar.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all rented cars and client's details.
app.get('/show/rented/carsDetails', async (req, res) => {
  try {
    const clientRenting = await ClientRenting.find();
    res.json(clientRenting);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Rented Cars", error });
  }
});

// Post all rented cars and client's details.
app.post('/upload/rented/carsDetails',upload.single('ID_File'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded.");
    }

    const newClientRenting = new ClientRenting({
      fullname: req.body.fullname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      ID_File: req.file.path.replace(/\\/g, "/"),
      carID: req.body.carID,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      price: req.body.price,
    });

    const carUpload = await newClientRenting.save();
    res.status(201).send({ message: "Car uploaded successfully", car: carUpload });
  } catch (err) {
    console.error("Error uploading the car:", err);
    res.status(500).send("Failed to upload car details.");
  }
});

// Delete rented car by ID
app.delete('/delete/rented/carsDetails/:id', async (req, res) => {
  try {
    const car = await RentCar.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }
    res.status(200).json({ message: 'Rented car deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Listening Port
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
