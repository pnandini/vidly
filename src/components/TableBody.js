import React from 'react';
import Like from "./like";

const TableBody = (props) => {
    const {data:movies,onLike,onDelete} = props;
    return (
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
    );
};

export default TableBody;
