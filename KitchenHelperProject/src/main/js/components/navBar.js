import { NavLink } from "react-router-dom";
import React from "react";

const navBar = () => {
    return (
        <nav>
            <NavLink to='/' exact={true}>Pantry</NavLink>
            <NavLink to='/recipes'>Recipes</NavLink>
            <NavLink to='/shopping-list'>Shopping</NavLink>
            <NavLink to='/saved'>Saved Recipes</NavLink>
            <NavLink to='/favourites'>Favourite Recipes</NavLink>
        </nav>

    );
}

export default navBar;