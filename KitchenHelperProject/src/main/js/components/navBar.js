import { NavLink } from "react-router-dom";
import React from "react";

const navBar = () => {
    return (
        <nav>
            <NavLink to='/' exact={true}>Pantry</NavLink>
            <NavLink to='/recipes'>Recipes</NavLink>
            <NavLink to='/shopping-list'>Shopping</NavLink>
        </nav>

    );
}

export default navBar;