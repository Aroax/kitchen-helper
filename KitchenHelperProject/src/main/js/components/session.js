import React, { useEffect } from "react";
import axios from "axios";
import Pantry from "./pantry";
import ShoppingList from "./shoppingList";
import ManualRecipe from "./manualRecipe";
import UserRecipes from "./userRecipes";
import Recipes from "./recipes";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './navBar';

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

    const userName = user ? <p>Welcome, {user.displayName}</p> : <div>Loading...</div>
    const pantry = user ? <Pantry user={user}></Pantry> : <div></div>
    const shoppingList = user ? <ShoppingList user={user}></ShoppingList> : <div></div>
    const recipes = user ? <Recipes user={user} /> : <div></div>
    const showProps = () => { user ? console.log(user) : null }
    const savedRecipes = user ? <UserRecipes user={user} recipes={user.savedRecipes} type="saved"></UserRecipes> : <div></div>
    const favouriteRecipes = user ? <UserRecipes user={user} recipes={user.favouriteRecipes} type="favourite"></UserRecipes> : <div></div>

    return (
        <div className="container">
        <button onClick={showProps}>DEBUG: Show Props</button>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/">
                        {userName}
                        {pantry}
                    </Route>
                    <Route path="/recipes">
                        {recipes}
                        {user ?  <ManualRecipe user={user} /> : <div>Loading...</div>}
                    </Route>
                    <Route path="/shopping-list">
                        {shoppingList}
                    </Route>
                    <Route path="/saved">
                        {savedRecipes}
                    </Route>
                    <Route path="/favourites">
                        {favouriteRecipes}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default user;
