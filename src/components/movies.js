import React, {Component} from 'react';
import {deleteMovie, getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from "./Pagination";
import Paginate from '../utils/Paginate';
import Generes from './Genres-list-group';
import MoviesTable from "./moviesTable";
import _ from 'lodash';
import Input from "./Input";

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
        generes: [{_id: "0", name: "All Genres"}, ...getGenres()],
        selectedGenera: {_id: "0", name: "All Genres"},
        sortColumn: {path: 'title', order: 'asc'},
        searchTerm: '',
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
    handleSearch = ({currentTarget: input}) => {
        let searchTerm = input.value;
        this.setState({searchTerm});
        searchTerm = searchTerm.toString().toLowerCase();
        const fMovies = getMovies();
        const movies = fMovies.filter((d) =>
            d.title.toLowerCase().includes(searchTerm)
        );
        console.log(movies);
        this.setState({movies, selectedGenera: {_id: "0", name: "All Genres"}})
    };

    getPagedData() {
        const {movies, selectedGenera, sortColumn} = this.state;
        const filtered = selectedGenera._id !== "0" ? movies.filter(m => m.genre.name === selectedGenera.name) : movies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        return {data: sorted, totalCount: sorted.length}

    }


    render() {
        const {totalCount: length, data} = this.getPagedData();
        const cu = Paginate(data, this.state.currentPage, this.state.pageSize);
        const {selectedGenera, generes, sortColumn} = this.state;
        if (length === 0) return (<p> There are no movies available </p>);

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-2">
                        <Generes allGeners={generes} selected={selectedGenera}
                                 handleGenereChange={this.handleGenereChange}/></div>
                    <div className="col">
                        {/*<p> Showing {cu.length} of {length} movies</p>*/}
                        <p>
                            <button className="btn btn-primary" onClick={() => {
                                this.props.history.push("/new-movie")
                            }}>Add Movie
                            </button>
                        </p>

                        <Input name="search" label="" error="" value={this.state.searchTerm}
                               onChange={this.handleSearch}/>
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
        deleteMovie(movie._id);
        this.setState({movies: getMovies()});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };
}

export default Movies;