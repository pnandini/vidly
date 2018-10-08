import React from 'react';
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = (props) => {
    const {onSort, columns, sortColumn, movies, onDelete, onLike} = props;
    if (!movies || movies.length === 0) return "No movies found";
    return (
        <table className="table">
            <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn}/>
            <TableBody data={movies} onDelete={onDelete} onLike={onLike}/>
        </table>
    );
};

export default Table;
