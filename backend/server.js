const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const dns = require("node:dns");

const customerRoutes = require('./routes/customer.routes');

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Customer API is running'
  });
});

app.use('/api/customers', customerRoutes);

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});