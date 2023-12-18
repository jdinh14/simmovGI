// Import the node-fetch
const fetch = require('node-fetch');

// Function to retrieve movie info and sim mov

const movieID = async (movie, callback) => {

    // API key and base URL for the movie database API
    const apiKey = '085eb9367e5fbee0e0f71e77ac2e53ad';

    const baseApiUrl = 'https://api.themoviedb.org/3';


    // Authorization header for the API request; authenticating your requests to the TMDb API
    const authHeader = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjY5YzdjYTI1YWY5OGUwNDIwOGNkNjcyMTljMzIxMyIsInN1YiI6IjY1NzdhMGY0OTQ1MWU3MGZlYTZlODI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.waXvvnV7RZ375e17_ZCcBrH13zU1RMFAX0j86oINe18';

        try {

        // Construct the URL to search for the movie
     const movieSearchUrl = `${baseApiUrl}/search/movie?query=${movie}&include_adult=false&api_key=${apiKey}&language=en-US&page=1`;
        
        // Fetch movie data from the API
            const movieResponse = await fetch(movieSearchUrl, {
            method: 'GET',
            headers: { accept: 'application/json', Authorization: authHeader }
        });
        const movieData = await movieResponse.json();

        // Error if movie is not found
        if (!movieData.results.length) {
            return callback(new Error('No movie found'));
        }

        // Extract the ID of the first movie found
        const movieID = movieData.results[0].id;

    
    
        // Construct the URL to fetch similar movies
        const similarMoviesUrl = `${baseApiUrl}/movie/${movieID}/similar?language=en-US&page=1`;
        
     // Fetch similar movies from the API
        const similarResponse = await fetch(similarMoviesUrl, {
            method: 'GET',
            headers: { accept: 'application/json', Authorization: authHeader }
        }
        );

        const similarData = await similarResponse.json();



        // Map the results to get titles and image URLs
     const similar = similarData.results.map(element => element.title);
        const images = similarData.results.map(element => `https://image.tmdb.org/t/p/original/${element.poster_path}`);


        // Combine the similar movies and images in a result object
        const result = { similar, images };

        // Execute the callback function with the result
        callback(undefined, result);

    } catch (error) {
        // Log and return the error through the callback if an exception occurs
        console.error('error:', error);
        callback(error);
    }
};

// Export the movieID function to be used in other parts of the application
module.exports = movieID;
