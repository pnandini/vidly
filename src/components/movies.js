import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";
import Like from './like';
import Pagination from "./pagination";
//import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
    };
    handleLikeChange = (movie) => {
        const mvs = [...this.state.movies];
        mvs[mvs.indexOf(movie)].liked = !mvs[mvs.indexOf(movie)].liked;
        this.setState({movies: mvs});
    };

    render() {
        const {length} = this.state.movies;
         const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
        const cu = this.state.movies.slice(startIndex,startIndex+this.state.pageSize);
        console.log(cu);
        /*const curMovies = this.state.movies.filter((movie) => {
            const i = this.state.movies.indexOf(movie) + 1;
            //console.log(i);
            return (i > (this.state.currentPage - 1) * Math.ceil(this.state.movies.length / this.state.pageSize)) && i <= (this.state.currentPage * Math.ceil(this.state.movies.length / this.state.pageSize));
        });*/
        if (length === 0) return (<p> There are no movies available </p>);
        return (
            <React.Fragment>
                <p> Showing {cu.length} of {length} movies</p>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Like</th>
                        <th scope="col">Delete?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cu.map(movie => (
                        <tr key={movie._id}>
                            <th scope="row">{this.state.movies.indexOf(movie)+1}</th>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like handleLikeChange={() => this.handleLikeChange(movie)} liked={movie.liked}/></td>
                            <td>
                                <button onClick={() => this.handleDelete(movie)}
                                        className="btn btn-danger btn-sm">Delete
                                </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
                <Pagination itemsCount={length} currentPage={this.state.currentPage} pageSize={this.state.pageSize}
                            onPageChange={this.handlePageChange}/>
            </React.Fragment>
        );
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };
}

export default Movies;