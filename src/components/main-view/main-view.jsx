import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  componentDidMount(){
    axios.get('https://best-flix-10922.herokuapp.com/movies')
    .then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  // when home button is clicked in movie-view, re-render DOM with selectedMovie set to "null", which brings you back to main-view
  onHomeClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    //If the state isn't initialized, this will throw on runtime
    //before the data is initially loaded
    const { movies, selectedMovie } = this.state;

    //before the movies have been loaded
    if (!movies) return <div className='main-view'/>;
    return (
      <div className='main-view'>
        { selectedMovie
          ? <MovieView movie={selectedMovie} onClick={() => this.onHomeClick()}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          ))
        }
      </div>
    );
  }
}