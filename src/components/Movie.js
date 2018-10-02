import React from 'react';
import {parse} from 'query-string';

const Movie = (props) => {
    const movie_id = parse(props.location.search);
    return (
        <div>
            <h1>Movie id is {movie_id.id}</h1>
            <button className="btn btn-primary" onClick={() => {
                props.history.push("/home")
            }}>Save
            </button>
        </div>
    )
        ;
};

export default Movie;
