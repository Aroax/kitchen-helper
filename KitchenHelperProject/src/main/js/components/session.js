import React, { useEffect } from "react";
import axios from "axios";
import Pantry from "./pantry";
import ShoppingList from "./shoppingList";
import RecipesHub from "./recipesHub"
import MealPlanner from "./mealPlanner";
import ManualRecipe from "./manualRecipe";
import UserRecipes from "./userRecipes";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './navBar';
import Profile from './profile';
import RestockList from "./restockList";

const user = () => {
    const [user, setUser] = React.useState();
    const [refreshUser, setRefreshUser] = React.useState(true);
    const [ongoingRecipe, setOngoingRecipe] = React.useState([]);

    const handleUserChange = () => {
      setRefreshUser(true);
    }

    const refresh = (recipe) => {
        // console.log(recipe);
        setOngoingRecipe(recipe)
    };

    useEffect(() => {
      if (refreshUser) {
        axios({
          method: 'get',
          url: `/users/name/mikeyMike`,
          headers: { 'Content-Type': 'application/json' },

        }).then((response) => {
            setRefreshUser(false);
            let currentUser = response.data;
            currentUser.pantry = currentUser.pantry.reverse();
            setUser(currentUser);
        })
      }
    });

    const userName = user ? <Profile user={user.displayName} /> : <div>Loading...</div>
    const pantry = user ? <Pantry user={user} refreshUser={handleUserChange}></Pantry> : <div></div>
    const shoppingList = user ? <ShoppingList user={user} refreshUser={handleUserChange}></ShoppingList> : <div></div>
    const recipes = user ? <RecipesHub user={user} refreshUser={handleUserChange}/> : <div></div>
    const showProps = () => { user ? console.log(user) : null }
    const savedRecipes = user ? <UserRecipes user={user} recipes={user.savedRecipes} type="saved" refreshUser={handleUserChange}></UserRecipes> : <div></div>
    const favouriteRecipes = user ? <UserRecipes user={user} recipes={user.favouriteRecipes} type="favourites" refreshUser={handleUserChange}></UserRecipes> : <div></div>
    const customRecipes = user ? <ManualRecipe user={user} refreshUser={handleUserChange}></ManualRecipe> : <div></div>
    const mealPlanner = user ? <MealPlanner user={user} refreshUser={handleUserChange}/> : <div></div>
    const restockList = user ? <RestockList user={user} refreshUser={handleUserChange} /> : <div></div>
    const searchRecipes = user ? <RecipesHub user={user} refreshUser={handleUserChange}/> : <div></div>

    return (
        <div className="container">
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/profile">
                        {userName}
                        <hr />
                    </Route>
                    <Route exact path="/">
                        {pantry}
                        <button onClick={showProps}>DEBUG: Show Props</button>
                    </Route>
                    {/* <Route path="/recipes">
                        {recipes}
                    </Route> */}
                    <Route path="/shopping-list">
                        {restockList}
                        {shoppingList}
                    </Route>
                    <Route path="/saved">
                        {savedRecipes}
                    </Route>
                    <Route path="/favourites">
                        {favouriteRecipes}
                    </Route>
                    <Route path="/custom">
                        {customRecipes}
                    </Route>
                    <Route path="/meal-planner">
                        {mealPlanner}
                    </Route>
                    <Route path="/search-recipes">
                        {searchRecipes}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default user;
