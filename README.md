## myFlix-client
This is the client side of the myFlix application, which is an interface showcasing movies and their details from the movie_api database. Users can create a profile to view movies and save them as favorites. ([see movie_api repo for server side](https://github.com/mthomp35/movie_api))

The myFlix application uses full-stack JavaScript technologies - the MERN tech stack:
* MongoDD
* Express
* React
* Node.js

Heroku and Netlify were both used as hosts for this project.

Redux and Flux were used to manage the application’s state in order to make the project more scalable in future. States managed include:
* SET_MOVIES
* SET_FILTER (to filter movies)
* SET_USER

### myFlix Features:

Main view
* Returns a list of ALL movies to the user (each listed item with an image, title, and description)
* Allows sorting and filtering based on movie title
* Ability to select a movie for more details

Single movie view
* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites

Genre view
* Returns data about a genre, with a name and description
* Displays example movies

Director view
* Returns data about a director (name, bio, birth year, death year)
* Displays example movies

Profile view
* Allows users to view and update their personal information
* Shows list of user's favorite movies and provides an option to remove movies from favorites

Login view
* Allows users to log in with a username and password

Registration view
* Allows new users to register (username, password, email, birthday)

