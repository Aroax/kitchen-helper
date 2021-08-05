import React, { useEffect } from 'react';
import axios from 'axios';
import IngredientCard from "./ingredient";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrimaryButton from "./buttonPrimary";

const ExpiringIngredients = (props) => {
    let pantry = props.user.pantry;
    let expiringIngredients = [];
    // findExpiringIngredients();
    

    useEffect(() => {
        pantry.map((ingredient) => {
            if (expiryCalculator(ingredient) <= 2) {
                expiringIngredients.push(ingredient);
            }
        });
    },[]);

    console.log('expiringIngredients', expiringIngredients);
  

    const getExpiringSoon = (ingredientList) => {

        return ingredientList.map((ingredient) => {
            return (
                <Grid item xs={12} sm={6} md={4}>


                    <IngredientCard data={ingredient} user={props.user} userId={props.user.id}></IngredientCard>
                    <br></br>
                    {/* <button onClick={() => { inspireMe(ingredient) }}>Inspire Me</button> */}
                    {/* <button onClick={() => { freezeMe(ingredient) }}>Freeze Me</button> */}


                </Grid>
            )
        });
    }

   

    // const findExpiringIngredients = () => {
    //     pantry.map((ingredient) => {
    //         if (expiryCalculator(ingredient) <= 2) {
    //             expiringIngredients.push(ingredient);
    //         }
    //     });
    // }

    // function addDays(date, days) {
    //     const copy = new Date(Number(date))
    //     copy.setDate(date.getDate() + days)
    //     return copy;
    //   }


    const expiryCalculator = (ingredient) => {
        const expiryDate = new Date(ingredient.expiry)
        const today = new Date();
        const diff = expiryDate - today;
        let remainingDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        return remainingDays;
    }


    // const dismissAll = () => {
    //     axios({
    //         method: 'patch',
    //         url: `/users/${props.user.id}/restock-list/remove-all`,
    //         headers: { 'Content-Type': 'application/json' },
    //         data: restockList
    //     }).then((response) => {
    //         console.log(response);
    //         props.refreshUser();
    //     })
    // }


    const View = () => {
        return (
            <div>
                <h2>Heads up! You've run out of these, would you like to add any to your shopping list?</h2>
                
                {getExpiringSoon(expiringIngredients)}
                <br></br>
                {/* <button onClick={() => { dismissAll() }}>Dismiss All</button> */}
                <br></br>
                <hr />
                <br></br>
            </div>
        );
    }


    const output = (expiringIngredients.length > 0) ? <View /> : null


    return (
        <Grid container direction="row" alignItems="flex-start" spacing={1}>
            {output}
        </Grid>
    );
}

export default ExpiringIngredients;