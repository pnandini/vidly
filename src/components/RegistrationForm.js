import React from 'react';
import Form from "./Form";
import Joi from "joi-browser";

class RegistrationForm extends Form {
    state = {
        formData: {
            name: '',
            email: '',
            password: ''
        },
        errors: {}
    };

    doSubmit() {
        //
        console.log("Submitted")
    }

    schema = {
        name: Joi.string().required().label("Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().min(5).max(8).label("Password")
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    {this.renderInput('name', 'Name', 'name')}
                    {this.renderInput('email', 'Email Address', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderSubmitButton('Register')}
                </form>

            </div>
        );
    }
}

export default RegistrationForm;