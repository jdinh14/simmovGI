const userInput = document.getElementById('userInput'); 
const submit = document.getElementById('submit'); 
const message = document.getElementById('message'); 
const list = document.getElementById('grid'); // grid element where movie results will be displayed


// Adding an event listener to the submit button
submit.addEventListener('click', async (e) => {

    e.preventDefault(); // Prevent the default form behavior

    // Retrieve the movie name entered and trim any space
    
    const movie = userInput.value.trim();

    // Clear the current contents of the list and message elements
    list.innerHTML = '';
    message.textContent = '';

         try {

        // Fetch data from the server using the movie name provided by the user
        const response = await fetch(`http://localhost:3000/similar?movie=${movie}`);
        const data = await response.json(); // Parse the JSON response

        // Check for an error
        if (data.error) {
            message.textContent = data.error;
    
        }

        // Loop through each similar movie received in the response
        data.similar.forEach((title, index) => {

            // Creating a new container for each movie
            const container = document.createElement('section');
            container.className = 'similar-container';

            // Create an image for the movie
            const imageElement = document.createElement('img');
            
            imageElement.src = data.images[index]; // Set the source of the image
            imageElement.alt = title; 
            container.appendChild(imageElement); // Adds image to the container

            // shows title in the p 
            const titleElement = document.createElement('p');
            titleElement.textContent = title; // Set the title in textcontent

            container.appendChild(titleElement); // Add the title to the container

            // Add the container to the main element
            list.appendChild(container);
        });

    } catch (error) {

        // Catch error and display a user-friendly message to the console 
        console.error('404:', error);
        message.textContent = 'An error occurred; please try another movie name';
    }
});
