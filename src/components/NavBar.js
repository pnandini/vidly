import React from 'react';
import {Link, NavLink} from "react-router-dom";

const NavBar = (props) => {
    const tabs = [{path: "/movies", label: "Movies"}, {path: "/customers", label: "Customers"}, {
        path: "/rental",
        label: "Rental"
    }];
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand" to="/home">Vidly</Link>
            <div className="collapse navbar-collapse" id="">
                <ul className="navbar-nav mr-auto">
                    {tabs.map(tab => (
                        <li key={tab.path} className="nav-item active">
                            <NavLink className="nav-link" to={tab.path}>{tab.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>

    );
};

export default NavBar;
