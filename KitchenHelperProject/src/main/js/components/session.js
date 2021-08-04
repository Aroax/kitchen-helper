import React, { useEffect } from "react";
import axios from "axios";
import Pantry from "./pantry";
import ShoppingList from "./shoppingList";
import RecipesHub from "./recipesHub"

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './navBar';
import Profile from './profile';

const user = () => {
    const [user, setUser] = React.useState();
    const [ongoingRecipe, setOngoingRecipe] = React.useState([]);
    const refresh = (recipe) => {
        console.log("bananas");
        console.log(recipe);
        setOngoingRecipe(recipe)
    };

    useEffect(() => {
        axios({
            method: 'get',
            url: `/users/name/mikeyMike`,
            headers: { 'Content-Type': 'application/json' },

        }).then((response) => {
            setUser(response.data);
        })
    }, [])

    const userName = user ? <Profile user={user.displayName} /> : <div>Loading...</div>
    const pantry = user ? <Pantry user={user}></Pantry> : <div></div>
    const shoppingList = user ? <ShoppingList user={user}></ShoppingList> : <div></div>
    const recipes = user ? <RecipesHub user={user} /> : <div></div>
    const showProps = () => { user ? console.log(user) : null }

    return (
        <div className="container">
            <button onClick={showProps}>DEBUG: Show Props</button>
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/profile">
                        {userName}
                        <hr />
                    </Route>
                    <Route exact path="/">
                        {pantry}
                    </Route>
                    <Route path="/recipes">
                        {recipes}
                    </Route>
                    <Route path="/shopping-list">
                        {shoppingList}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default user;
