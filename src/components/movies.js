import React, {Component} from 'react';
import {getMovies, deleteMovie} from "../services/movieService";
import {getGenres} from "../services/genreService";
import Pagination from "./Pagination";
import Paginate from '../utils/Paginate';
import Generes from './Genres-list-group';
import MoviesTable from "./moviesTable";
import _ from 'lodash';
import Input from "./Input";

class Movies extends Component {
    state = {
        movies: '',
        pageSize: 4,
        currentPage: 1,
        selectedGenera: {_id: "0", name: "All Genres"},
        sortColumn: {path: 'title', order: 'asc'},
        searchTerm: '',
    };


    async componentDidMount() {
        const {data: movies} = await getMovies();
        const {data: gen} = await getGenres();
        const genres = [{_id: "0", name: "All Genres"}, ...gen];
        this.setState({movies, genres: genres});
        console.log(genres);
    }

    handleLikeChange = (movie) => {
        const mvs = [...this.state.movies];
        mvs[mvs.indexOf(movie)].liked = !mvs[mvs.indexOf(movie)].liked;
        this.setState({movies: mvs});
    };
    handleGenereChange = (genre) => {
        this.setState({selectedGenera: genre, searchTerm: '', currentPage: 1});
    };
    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    };
    handleSearch = async ({currentTarget: input}) => {
        let searchTerm = input.value;
        this.setState({searchTerm});
        searchTerm = searchTerm.toString().toLowerCase();
        const {data: fMovies} = await getMovies();
        const movies = fMovies.filter((d) =>
            d.title.toLowerCase().includes(searchTerm)
        );
        console.log(movies);
        this.setState({movies, selectedGenera: {_id: "0", name: "All Genres"}, currentPage: 1})
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
        const {selectedGenera, genres, sortColumn} = this.state;
        console.log(genres);
        if (!genres) {
            return null
        }
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-2">
                        <Generes allGeners={genres} selected={selectedGenera}
                                 handleGenereChange={this.handleGenereChange}/>
                    </div>
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

    handleDelete = async (movie) => {
        await deleteMovie(movie._id);
        const {data: movies} = await getMovies();
        console.log(movies);
        this.setState({movies});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };
}

export default Movies;