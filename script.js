//This Code is Written BY Anchal Sinha

// Replace 'YOUR_API_KEY' with your actual OMDB API key
const apiKey = '928920aa';
const apiUrl = 'https://www.omdbapi.com/';

// Function to fetch movie data from the OMDB API
function fetchMovieData(movieTitle) {
  const url = `${apiUrl}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => displayMovieInfo(data))
    .catch(error => console.error('Error fetching data:', error));
}

// Function to display movie information
function displayMovieInfo(data) {
  const movieContainer = document.getElementById('movie-info');

  // Clear previous movie data
  movieContainer.innerHTML = '';

  if (data.Response === 'True') {
    // If the movie data is found, display it
    const title = data.Title;
    const year = data.Year;
    const poster = data.Poster;
    const plot = data.Plot;

    const movieInfoHTML = `
      <h2>${title} (${year})</h2>
      <img src="${poster}" alt="${title} Poster" />
      <p>${plot}</p>
    `;
    
    movieContainer.innerHTML = movieInfoHTML;
  } else {
    // If the movie data is not found, display an error message
    const errorMessage = `
      <p>Movie not found.</p>
    `;
    
    movieContainer.innerHTML = errorMessage;
  }
}

// Function to clear the suggestions container
function clearSuggestionsContainer() {
  const suggestionsContainer = document.getElementById('suggestions');
  suggestionsContainer.innerHTML = '';
}

// Modify the handleFormSubmit function to include input validation
function handleFormSubmit(event) {
  event.preventDefault();

  const movieTitleInput = document.getElementById('movie-title');
  const movieTitle = movieTitleInput.value.trim();

  if (movieTitle === '') {
    // Display an alert if the movie title is blank
    alert('Movie title cannot be blank.');
    return; // Exit the function if validation fails
  }

  // Redirect to the new movie page with the movie title as a query parameter
  window.location.href = `movie.html?title=${encodeURIComponent(movieTitle)}`;
}

// Function to display favorites on the favorites.html page
function displayFavorites() {
  const favoritesContainer = document.getElementById('favorites-container');

  // Retrieve favorites from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.length === 0) {
    // If there are no favorites, display a message
    favoritesContainer.innerHTML = '<p>No favorites added yet.</p>';
  } else {
    // If there are favorites, create HTML elements to display them
    favoritesContainer.innerHTML = '';
    favorites.forEach((movie, index) => { // Include index in the forEach callback
      const movieInfoHTML = `
        <div>
          <h2>${movie.title} (${movie.year})</h2>
          <img src="${movie.poster}" alt="${movie.title} Poster" />
          <button class="delete-btn" data-index="${index}">Delete</button> <!-- Add a data-index attribute -->
        </div>
      `;
      favoritesContainer.innerHTML += movieInfoHTML;
    });
  }
}

// Call the displayFavorites function when the favorites.html page loads
document.addEventListener('DOMContentLoaded', () => {
  displayFavorites();
  attachDeleteButtonListeners();
});

// Function to attach event listeners to delete buttons
function attachDeleteButtonListeners() {
  const favoritesContainer = document.getElementById('favorites-container');

  favoritesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.dataset.index;
      deleteFromFavorites(index);
    }
  });
}

// Function to add a movie to favorites
function addToFavorites(event, title, year, poster, imdbID) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve favorites from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  // Check if the movie is already in favorites
  const existingMovie = favorites.find((movie) => movie.imdbID === imdbID);
  if (existingMovie) {
    alert('This movie is already in your Favorites!');
    return;
  }

  // Add the new movie to favorites
  favorites.push({ title, year, poster, imdbID });
  localStorage.setItem('favorites', JSON.stringify(favorites));

  alert('Added to Favorites!');
}

// Function to update the favorites button with the count
function updateFavoritesButton(count) {
  const favoritesButton = document.getElementById('favorites-button');
  if (count > 0) {
    favoritesButton.innerText = `Favorites (${count})`;
    favoritesButton.style.backgroundColor = 'red'; // Change the style of the button to indicate favorites
  } else {
    favoritesButton.innerText = 'Favorites';
    favoritesButton.style.backgroundColor = 'pink'; // Revert the style when no favorites
  }
}

// Function to fetch movie suggestions from the OMDB API
function fetchMovieSuggestions(movieTitle) {
  const url = `${apiUrl}?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => displayMovieSuggestions(data))
    .catch(error => console.error('Error fetching suggestions:', error));
}

// Function to display movie suggestions
function displayMovieSuggestions(data) {
  const suggestionsContainer = document.getElementById('suggestions');

  // Clear previous suggestions
  suggestionsContainer.innerHTML = '';

  if (data.Response === 'True' && data.Search) {
    const suggestions = data.Search;
    suggestions.forEach(movie => {
      const suggestionElement = document.createElement('a');
      suggestionElement.classList.add('suggestion');
      suggestionElement.href = `movie.html?title=${encodeURIComponent(movie.Title)}`;

      const movieInfoHTML = `
        <img src="${movie.Poster}" alt="${movie.Title} Poster" />
        <div>
          <p>${movie.Title}</p>
          <p>Year: ${movie.Year}</p>
          <button onclick="addToFavorites(event, '${movie.Title}', '${movie.Year}', '${movie.Poster}', '${movie.imdbID}')">Add to Favorites</button>
        </div>
      `;

      suggestionElement.innerHTML = movieInfoHTML;
      suggestionsContainer.appendChild(suggestionElement);
    });
  }
}

// Function to delete a movie from favorites
function deleteFromFavorites(index) {
  // Retrieve favorites from local storage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (index >= 0 && index < favorites.length) {
    // Remove the movie from favorites at the specified index
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Refresh the display of favorites
    displayFavorites();
  }
}

// Function to handle the input change and show suggestions
function handleInputChange(event) {
  const movieTitleInput = event.target;
  const movieTitle = movieTitleInput.value.trim();
  const suggestionsContainer = document.getElementById('suggestions');
  const movieInfoContainer = document.getElementById('movie-info'); // Get the movie-info container

  if (movieTitle !== '') {
    fetchMovieSuggestions(movieTitle);
  } else {
    // If the input is empty, clear the suggestions and movie-info containers
    suggestionsContainer.innerHTML = '';
    movieInfoContainer.innerHTML = ''; // Clear the movie-info container
  }
}

// Attach event listener to the input for handling input change
const movieTitleInput = document.getElementById('movie-title');
movieTitleInput.addEventListener('input', handleInputChange);

// Attach event listener to the form for handling form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleFormSubmit);
