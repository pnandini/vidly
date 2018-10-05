import React from 'react';
import {parse} from 'query-string';
import MovieForm from "./MovieForm";
import {getMovie} from "../services/fakeMovieService";

const Movie = (props) => {
    const movie_id = parse(props.location.search);
    const movie = getMovie(movie_id.id);
    return (
        <div>
            <h1>Movie id is {movie_id.id}</h1>
            <MovieForm {...props} title={movie.title} genre={movie.genre._id} rate={movie.dailyRentalRate}
                       stock={movie.numberInStock} id={movie._id}/>
        </div>
    )
        ;
};

export default Movie;
