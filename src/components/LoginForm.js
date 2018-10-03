import React from 'react';
import Joi from 'joi-browser';
import Form from "./Form";

class LoginForm extends Form {
    state = {
        formData: {
            email: '',
            password: ''
        },
        errors: {}
    };

    schema = {
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password")
    };


    doSubmit() {
        //
        console.log("Server")
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    {this.renderInput('email', 'Email Address', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderSubmitButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;