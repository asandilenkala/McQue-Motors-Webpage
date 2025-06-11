const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./model/Admin');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const getAdmin = async () => {
    const admin = await Admin.findOne();  // Fetch any admin
    console.log(admin);
    mongoose.connection.close();
};

getAdmin();
