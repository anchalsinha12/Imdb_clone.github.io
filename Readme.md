Live Hosted Link: https://anchalsinha12.github.io/Imdb_clone.github.io/

Here's a `README.md` file that provides an overview of my project:

# IMDb Clone Project

This project is a simplified IMDb clone that allows users to search for movies, view movie details, and add movies to their favorites. The project includes HTML, CSS, and JavaScript files to create a functional web application. Below is an overview of the project structure and functionalities.

## Project Structure

The project consists of the following files:

- `index.html`: The main HTML file for the home page, where users can search for movies.
- `favorites.html`: A separate HTML file for the favorites page, where users can view and manage their favorite movies.
- `movie.html`: The HTML file for displaying detailed information about a specific movie.
- `style.css`: The CSS file containing styling for various elements in the application.
- `script.js`: The JavaScript file containing the main logic for handling user interactions and API requests.

## Features

### Home Page (`index.html`)

- Users can enter a movie title in the search box and receive suggestions as they type.
- Suggestions include movie titles, years, and an "Add to Favorites" button.
- Clicking on a suggestion redirects users to the movie details page (`movie.html`) for the selected movie.

### Movie Details Page (`movie.html`)

- Displays detailed information about a specific movie, including its title, year, poster, plot, director, writer, and release date.
- Retrieves movie data from the OMDB API using the provided API key.
- Users can add the movie to their favorites from this page.

### Favorites Page (`favorites.html`)

- Users can view their favorite movies, including title, year, poster, and plot.
- Movies are retrieved from the local storage, and users can delete movies from their favorites list.

## How to Use

1. Clone this repository to your local machine.
2. Open the project folder and locate the `index.html` file.
3. Open the `index.html` file in a web browser to access the home page.
4. Enter a movie title in the search box and select a suggestion to view movie details.
5. Click the "Add to Favorites" button on the movie details page to add the movie to your favorites.
6. Navigate to the `favorites.html` page to view and manage your favorite movies.

Note: To run the project, you need an active internet connection as the OMDB API is used to fetch movie data.

## Customization

- Replace `'YOUR_API_KEY'` in the JavaScript files with your actual OMDB API key.
- Adjust the styling in the `style.css` file to match your preferred design.

## Technologies Used

- HTML
- CSS
- JavaScript

## Credits

- The project structure and initial code were provided by the user.
- Movie data is fetched from the [OMDB API](http://www.omdbapi.com/).

// Project Created By Anchal Sinha
