import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavBar = (props) => {
        const tabs = [{path: "/movies", label: "Movies"}, {path: "/customers", label: "Customers"}, {
            path: "/rental",
            label: "Rental"
        }, {
            path: "/login",
            label: "Login"
        }, {
            path: "/register",
            label: "Register"
        }];
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link className="navbar-brand" to="/movies">Vidly</Link>
                <div className="collapse navbar-collapse" id="">
                    <ul className="navbar-nav mr-auto">
                        {tabs.map(tab => (
                            <NavLink key={tab.path} className="nav-item nav-link" to={tab.path}>{tab.label}</NavLink>
                        ))}
                    </ul>
                </div>
            </nav>

        );
    }
;

export default NavBar;
