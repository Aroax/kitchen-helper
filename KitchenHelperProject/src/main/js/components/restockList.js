import React from 'react';
import axios from 'axios';
import IngredientCard from "./ingredient";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryButton from "./buttonPrimary";
import SecondaryButton from "./buttonSecondary";

const RestockList = (props) => {
    let restockList = props.user.restockList;

    console.log('props in restock', props);
    console.log(restockList);

    const getRestockIngredients = (list) => {
        return list.map((ingredient) => {
            return (
                <Grid item xs={12} sm={6} md={4}>
                    <IngredientCard data={ingredient} user={props.user} userId={props.user.id} bool={true}></IngredientCard>
                    <br />
                    <PrimaryButton text="Add to Shopping List" onClick={(event) => { addToShoppingListFromRestock(event, ingredient) }}/>
                    
                    <SecondaryButton text="Dismiss Item" onClick={(event) => { dismissItem(event, ingredient) }}/>
                </Grid>
            )
        });
    }

    const addToShoppingListFromRestock = (event, ingredient) => {
        event.preventDefault();
        ingredient.weightNeeded = 0;
        axios({
            method: 'patch',
            url: `/users/${props.user.id}/shopping-list/add-from-restock`,
            headers: { 'Content-Type': 'application/json' },
            data: ingredient
        }).then((response) => {
            console.log(response);
            props.refreshUser();
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
            props.refreshUser();
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
            props.refreshUser();
        })
    }


    const View = () => {
        return (
            <Grid container direction="row" alignItems="flex-start" spacing={1}>
                <h2>Heads up! You've run out of these, would you like to add any to your shopping list?</h2>
                {getRestockIngredients(restockList)}
                <br></br>
                <button onClick={() => { dismissAll() }}>Dismiss All</button>
                <br></br>
                <hr />
                <br></br>
            </Grid>
        );
    }


    const output = (restockList.length > 0) ? <View /> : null
    const classes = useStyles();

    return (
        <main className={classes.restock}>
            <div className={classes.toolbar} />
            {output}
        </main>
    );
}

export default RestockList;

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    restock: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));