import React from 'react';
import Form from "./Form";
import Joi from "joi-browser";

class MovieForm extends Form {
    state = {
        formData: {
            title: '',
            genre: '',
            stock: '',
            rate: ''
        },
        errors: {}
    };

    doSubmit() {
        //
        console.log("Submitted")
    }

    schema = {
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        stock: Joi.number().positive().required().label("Stock"),
        rate: Joi.number().max(5).required().label("Rate"),
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    {this.renderInput('title', 'Title', 'text')}
                    {this.renderInput('genre', 'Genre', 'select')}
                    {this.renderInput('numInStock', 'Number in Stock', 'number')}
                    {this.renderInput('rate', 'Rate', 'number')}
                    {this.renderSubmitButton('Save')}
                </form>

            </div>
        );
    }
}

export default MovieForm;