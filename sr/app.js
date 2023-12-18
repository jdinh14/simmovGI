// Import module
const express = require('express'); // Importing Express
const hbs = require('hbs'); // Importing Handlebars
const path = require('path'); // Importing Path for handling file and directory paths
const movieID = require('./utils/simmov'); // movie functionalities

// Initialize an Express application
const app = express(); // Creates instance of an express application

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); // Sets path for public directory (static files like CSS, JS)
const viewsPath = path.join(__dirname, '../templates/views'); // Setting the path to views (Handlebars templates)

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // Setting Handlebars as the templating engine
app.set('views', viewsPath); // Telling Express to use the specified views directory

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // Serving static files from the specified public directory

// Route for the home page
app.get('', (req, res) => {
    res.render('index'); // Calls'index' view when the root URL ' ' is opened
});

// Route for similar movies
app.get('/similar', (req, res) => {
    const { movie } = req.query; // Extracting 'movie' from the query parameters

    if (!movie) {
        return res.send({ error: 'Please provide a movie name' }); // Sending an error message if 'movie' is not provided
    }

    movieID(movie, (error, data) => {
        if (error) {
            return res.send({ error }); // Sending error response if there's an error in func
        }

        res.send(data); // Data will be received from function
    });
});



// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.'); 
});
