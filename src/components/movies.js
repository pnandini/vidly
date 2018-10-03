import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from "./Pagination";
import Paginate from '../utils/Paginate';
import Generes from './Genres-list-group';
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
        generes: [{_id: "0", name: "All Genres"}, ...getGenres()],
        selectedGenera: {_id: "0", name: "All Genres"},
        sortColumn: {path: 'title', order: 'asc'}
    };
    handleLikeChange = (movie) => {
        const mvs = [...this.state.movies];
        mvs[mvs.indexOf(movie)].liked = !mvs[mvs.indexOf(movie)].liked;
        this.setState({movies: mvs});
    };
    handleGenereChange = (genre) => {
        this.setState({selectedGenera: genre});
    };
    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    };

    getPagedData() {
        const {movies, currentPage, pageSize, selectedGenera, sortColumn} = this.state;
        const filtered = selectedGenera._id !== "0" ? movies.filter(m => m.genre.name === selectedGenera.name) : movies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        //console.log(filtered);
        const cu = Paginate(sorted, currentPage, pageSize);
        return {data: cu, totalCount: cu.length}

    }

    render() {
        const {totalCount: length, data: cu} = this.getPagedData();
        const {selectedGenera, generes, sortColumn} = this.state;
        if (length === 0) return (<p> There are no movies available </p>);


        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-2">
                        <Generes allGeners={generes} selected={selectedGenera}
                                 handleGenereChange={this.handleGenereChange}/></div>
                    <div className="col">
                        <p> Showing {cu.length} of {length} movies</p>
                        <MoviesTable onDelete={this.handleDelete} sortColumn={sortColumn} onLike={this.handleLikeChange}
                                     movies={cu} onSort={this.handleSort}/>
                        <Pagination itemsCount={length} currentPage={this.state.currentPage}
                                    pageSize={this.state.pageSize}
                                    onPageChange={this.handlePageChange}/>

                    </div>
                </div>
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