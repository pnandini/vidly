import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Movies from './components/movies'
import Customers from "./components/Customers";
import Rental from "./components/Rental";
import Switch from "react-router-dom/es/Switch";
import Redirect from "react-router-dom/es/Redirect";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Movie from "./components/Movie";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import MovieForm from "./components/MovieForm";

class App extends Component {
    //TODO:staticContext warning fix
    render() {
        return (<div>
                <NavBar/>
                <main className="container">
                    <Switch>
                        <Route path="/movies" component={Movies}/>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rental" component={Rental}/>
                        <Route path="/new-movie" component={MovieForm}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/movie" render={Movie}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/register" component={RegistrationForm}/>
                        <Redirect from="/home" to="/movies"/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found" replace="false"/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
