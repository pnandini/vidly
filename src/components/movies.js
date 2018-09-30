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
        generes:[{ _id: "0", name: "All Genres" },...getGenres()],
        selectedGenera: { _id: "0", name: "All Genres" },
        sortColumn: {path:'title',order:'asc'}
    };
    handleLikeChange = (movie) => {
        const mvs = [...this.state.movies];
        mvs[mvs.indexOf(movie)].liked = !mvs[mvs.indexOf(movie)].liked;
        this.setState({movies: mvs});
    };
    handleGenereChange = (genre) => {
        this.setState({selectedGenera:genre});
    };
    handleSort = (path) => {
        const sortColumn = {...this.state.sortColumn};
        if (path === sortColumn.path){
            sortColumn.order = (sortColumn.order === 'asc')?'desc':'asc';
        }
        else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({sortColumn});
    };

    render() {
        const {length} = this.state.movies;
        const {movies,currentPage,pageSize,selectedGenera,generes,sortColumn} = this.state;
        const filtered = selectedGenera._id !== "0" ? movies.filter( m => m.genre.name ===selectedGenera.name):movies;
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        //console.log(filtered);
        const cu = Paginate(sorted,currentPage,pageSize);
        if (length === 0) return (<p> There are no movies available </p>);
        return (
            <div className="row">
                <div className="col-2"><Generes allGeners={generes} selected={selectedGenera} handleGenereChange={this.handleGenereChange}/></div>
                <div className="col">
                <p> Showing {cu.length} of {length} movies</p>
                <MoviesTable onDelete={this.handleDelete} onLike={this.handleLikeChange} movies = {cu} onSort={this.handleSort}/>
                    <Pagination itemsCount={length} currentPage={this.state.currentPage} pageSize={this.state.pageSize}
                            onPageChange={this.handlePageChange}/>

                </div>
                </div>
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