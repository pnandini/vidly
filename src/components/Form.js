import {Component} from 'react';
import Joi from 'joi-browser';
import React from "react";
import Input from "./Input";

class Form extends Component {
    state = {
        formData: {},
        errors: {}
    };
    validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.formData, this.schema, options);
        if (!error) return null;
        const errors = error.details.map((item) => error[item.path[0]] = item.message);
        return errors ? errors : null;
    };
    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handelSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        this.doSubmit();
    };
    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const formData = {...this.state.formData};
        formData[input.name] = input.value;
        this.setState({formData, errors});
    };

    renderSubmitButton(label) {
        return <button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>
    }

    renderInput(name, label, type) {
        const {formData, errors} = this.state;
        return (<Input name={name} value={formData[name]}
                       label={label} type={type}
                       onChange={this.handleChange}
                       error={errors[name]}/>);
    }
}

export default Form;