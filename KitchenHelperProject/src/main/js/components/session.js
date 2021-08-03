import React, { useEffect } from "react";
import axios from "axios";
import Pantry from "./pantry";
import ShoppingList from "./shoppingList";
import ManualRecipe from "./manualRecipe";

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

    const userName = user ?  <p>Welcome, {user.displayName}</p> : <div>Loading...</div>
    const pantry = user ?  <Pantry user={user}></Pantry> : <div></div>
    const shoppingList = user ?  <ShoppingList user={user}></ShoppingList> : <div></div>
    const showProps = () => { user ? console.log(user) : null }


    return (
        <div className="container">
        <button onClick={showProps}>DEBUG: Show Props</button>
        <hr/>
          {userName}
          <hr/>
          {pantry}
          <hr/>
          {shoppingList}
          <hr/>
          <h3>recipe</h3>
          {user ?  <ManualRecipe user={user} /> : <div>Loading...</div>}
        </div>
    );
}

export default user;
