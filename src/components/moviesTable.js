import React, {Component} from 'react';
import Table from "./Table";


class MoviesTable extends Component {
    columns = [
        {path: 'id', label: 'ID'},
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {path: 'like', label: 'Like'},
        {path: 'delete', label: 'Delete?'}
    ];

    render() {
        const {movies, onDelete, onLike, onSort, sortColumn} = this.props;
        return (
            <Table columns={this.columns} sortColumn={sortColumn} movies={movies} onDelete={onDelete} onLike={onLike}
                   onSort={onSort}/>
        );
    }
}

export default MoviesTable;