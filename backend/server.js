const express = require('express');
const cors = require('cors');
require('dotenv').config();

const personRoutes = require('./routes/personRoutes');
const birthdayRoutes = require('./routes/birthdayRoutes');

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use('/api', personRoutes);
app.use('/api', birthdayRoutes);



// Test API
app.get('/', (req, res) => {
    res.send('Backend server is running');
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

const db = require('./db');

db.query('SELECT 1 AS test', (err, results) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected successfully:', results);
    }
});