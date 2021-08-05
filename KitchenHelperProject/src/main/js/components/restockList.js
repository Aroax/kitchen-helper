import React from 'react';
import axios from 'axios';
import IngredientCard from "./ingredient";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryButton from "./buttonPrimary";

const RestockList = (props) => {
    let restockList = props.user.restockList;

    console.log('props in restock', props);
    console.log(restockList);

    const getRestockIngredients = (list) => {
        return list.map((ingredient) => {
            return (
                <Grid item xs={12} sm={6} md={4}>


                    <IngredientCard data={ingredient} user={props.user} userId={props.user.id}></IngredientCard>
                    <br></br>
                    <button onClick={() => { addToShoppingList(event, ingredient) }}>Add to Shopping List</button>
                    <button onClick={() => { dismissItem(event, ingredient) }}>Dismiss Item</button>

                </Grid>
            )
        });
    }

    const addToShoppingList = (event, ingredient) => {
        event.preventDefault();
        ingredient.weightNeeded = 0;
        axios({
            method: 'patch',
            url: `/users/${props.user.id}/shopping-list/add`,
            headers: { 'Content-Type': 'application/json' },
            data: ingredient
        }).then((response) => {
            console.log(response);
            // location.reload();
        })
    }

    const dismissItem = (event, ingredient) => {
        event.preventDefault();
        axios({
            method: 'patch',
            url: `/users/${props.user.id}/restock-list/remove`,
            headers: { 'Content-Type': 'application/json' },
            data: ingredient
        }).then((response) => {
            console.log(response);
            // location.reload();
        })
    }


    const dismissAll = () => {
        axios({
            method: 'patch',
            url: `/users/${props.user.id}/restock-list/remove-all`,
            headers: { 'Content-Type': 'application/json' },
            data: restockList
        }).then((response) => {
            console.log(response);
            // location.reload();
        })
    }


    const View = () => {
        return (
            <div>
                <h2>Heads up! You've run out of these, would you like to add any to your shopping list?</h2>
                {getRestockIngredients(restockList)}
                <br></br>
                <button onClick={() => { dismissAll() }}>Dismiss All</button>
                <br></br>
                <hr />
                <br></br>
            </div>
        );
    }


    const output = (restockList.length > 0) ? <View /> : null


    return (
        <Grid container direction="row" alignItems="flex-start" spacing={1}>
            {output}
        </Grid>
    );
}

export default RestockList;