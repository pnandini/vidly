import axios from 'axios';
import config from '../config.json'
import * as genresAPI from "./genreService";

export function getMovies() {
    return axios.get(config.apiEndPoint + "movies/");
}
export function deleteMovie(movieid) {
    return axios.delete(config.apiEndPoint + "movies/"+movieid);
}
export function getMovie(id) {
    return axios.get(config.apiEndPoint + "movies/"+id);
}
export async function saveMovie(movie) {
    let movieInDb = (await getMovies()).data.find(m => m._id === movie._id) || {};
    movieInDb.title = movie.title;
    movieInDb.genre = (await genresAPI.getGenres()).data.find(g => g._id === movie.genreId);
    movieInDb.numberInStock = movie.numberInStock;
    movieInDb.dailyRentalRate = movie.dailyRentalRate;
    movieInDb.liked = movie.liked;

    if (!movieInDb._id) {
        movieInDb._id = (Date.now().toString());
    }
    axios.post(config.apiEndPoint+"movies/",movieInDb);
    return movieInDb;
}