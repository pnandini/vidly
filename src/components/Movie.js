import React from 'react';
import {parse} from 'query-string';
import MovieForm from "./MovieForm";
import {getMovie} from "../services/movieService";

const Movie = async (props) => {
    const movie_id = parse(props.location.search);
    const {data: movie} = await getMovie(movie_id.id);
    console.log({movie});
    try {
        return (
            <div>
                {/*<h1>Movie id is {movie._id}</h1>*/}
                {/*<MovieForm {...props} title={movie.title} genre={movie.genre._id} rate={movie.dailyRentalRate}*/}
                {/*stock={movie.numberInStock} id={movie._id}/>*/}
            </div>
        )
    }
    catch (e) {
        console.log(e);
    }
    ;
};

export default Movie;
