import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from '../services/userService';
import {toast} from "react-toastify";
import * as authService from "../services/authService";

class RegisterForm extends Form {
    state = {
        data: {username: "", password: "", name: ""},
        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .email()
            .label("Username"),
        password: Joi.string()
            .required()
            .min(5)
            .label("Password"),
        name: Joi.string()
            .required()
            .label("Name")
    };

    doSubmit = async () => {
        try {
            await userService.register(this.state.data);
            toast.success("Registration Successful");
            const {data: jwt} = await authService.login(this.state.data.username, this.state.data.password);
            authService.loginWithJwt(jwt);
            this.props.history.push("/");
        }
        catch (e) {
            if (e && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({errors});
                toast.error(e.response.data);
            }
        }
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
