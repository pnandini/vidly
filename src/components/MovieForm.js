import React from 'react';
import Form from "./Form";
import Joi from "joi-browser";
import {getGenres} from "../services/fakeGenreService";
import {saveMovie} from "../services/fakeMovieService";

class MovieForm extends Form {
    //ToDo: Handle default select on Genre
    state = {
        formData: {
            _id: '',
            title: '',
            genre: '',
            stock: '',
            rate: ''
        },
        errors: {},
        genres: getGenres
    };

    componentDidMount() {
        const {id, title, stock, rate, genre} = this.props;
        let {formData} = this.state;
        formData._id = id;
        formData.title = title;
        formData.stock = stock;
        formData.rate = rate;
        formData.genre = genre;
        this.setState({formData});
    }


    doSubmit() {
        //
        const {formData} = this.state;
        saveMovie({
            _id: formData._id,
            title: formData.title,
            genreId: formData.genre,
            numberInStock: formData.stock,
            dailyRentalRate: formData.rate,
            liked: false
        });
        this.props.history.push("/movies");
    }

    schema = {
        _id: Joi.string().optional().label("id"),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        stock: Joi.number().positive().required().label("Stock"),
        rate: Joi.number().min(0).max(5).required().label("Rate"),
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    {this.renderInput('title', 'Title', 'text')}
                    {this.renderInput('id', 'ID', 'hidden')}
                    {this.renderInput('genre', 'Genre', 'select', getGenres() || '')}
                    {this.renderInput('stock', 'Number in Stock', 'number')}
                    {this.renderInput('rate', 'Rate', 'number')}
                    {this.renderSubmitButton('Save')}
                </form>

            </div>
        );
    }
}

export default MovieForm;