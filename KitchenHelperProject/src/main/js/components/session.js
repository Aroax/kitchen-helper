import React, { useEffect } from "react";
import axios from "axios";
import Pantry from "./pantry";
import ShoppingList from "./shoppingList";
import Recipes from "./recipes";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './navBar';

const user = () => {
    const [user, setUser] = React.useState();

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

    return (
        <div className="container">
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/">
                        {userName}
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