const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { result: null, error: null });
});

app.post('/submit', async (req, res) => {
    const jsonInput = req.body.jsonInput;

    try {
        // Validate the JSON input
        const parsedInput = JSON.parse(jsonInput);

        if (!Array.isArray(parsedInput.data)) {
            throw new Error('Invalid input. "data" should be an array.');
        }

        // Send the JSON input to the backend
        const response = await axios.post(`${process.env.BACKEND_URL}/bfhl`, parsedInput);
        res.render('index', { result: response.data, error: null });
    } catch (error) {
        res.render('index', { result: null, error: 'Invalid JSON or API error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Frontend running on port ${PORT}`);
});
