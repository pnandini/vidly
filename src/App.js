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

class App extends Component {
    render() {
        return (<div>
                <NavBar/>
                <main className="container">
                    <Switch>
                        <Route path="/home" component={Movies}/>
                        <Route path="/movies" component={Movies}/>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rental" component={Rental}/>
                        <Route path="/movie" component={Movie}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect from="/home" to="/movies"/>
                        <Redirect from="/" exact to="/home"/>
                        <Redirect to="/not-found" replace="false"/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
