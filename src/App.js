import React, {Component} from "react";
import {Route, Redirect, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logout from "./components/logout";
import {getUser} from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";

class App extends Component {
    state = {};

    componentDidMount() {
        const user = getUser();
        if (user) {
            this.setState({user});
        }
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer/>
                <NavBar user={this.state.user}/>
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/login" component={LoginForm}/>
                        <ProtectedRoute path="/movies/:id" component={MovieForm}/>
                        <Route path="/movies" render={() => <Movies {...this.props} user={this.state.user}/>}/>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/logout" component={Logout}/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
