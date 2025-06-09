// Install express first: npm install express body-parser path

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the booking form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'booking.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, doctor, date, time } = req.body;
    console.log(`Appointment booked for ${name} with ${doctor} on ${date} at ${time}.`);
    
    res.send(`<h2>Thank you, ${name}! Your appointment with ${doctor} on ${date} at ${time} is confirmed.</h2>`);
});

// Start the server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
