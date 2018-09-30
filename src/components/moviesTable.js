import React from 'react';
import Like from "./like";

const MoviesTable = (props) => {
    const {movies,onDelete,onLike,onSort} = props;
    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th onClick={() => onSort('id')} scope="col">Id</th>
                    <th onClick={() => onSort('title')} scope="col">Title</th>
                    <th onClick={() => onSort('genre.name')} scope="col">Genre</th>
                    <th onClick={() => onSort('numberInStock')} scope="col">Stock</th>
                    <th onClick={() => onSort('dailyRentalRate')} scope="col">Rate</th>
                    <th onClick={() => onSort('like')} scope="col">Like</th>
                    <th scope="col">Delete?</th>
                </tr>
                </thead>
                <tbody>
                {movies.map(movie => (
                    <tr key={movie._id}>
                        <th scope="row">{movies.indexOf(movie) + 1}</th>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like handleLikeChange={() => onLike(movie)} liked={movie.liked}/></td>
                        <td>
                            <button onClick={() => onDelete(movie)}
                                    className="btn btn-danger btn-sm">Delete
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
};

export default MoviesTable;
