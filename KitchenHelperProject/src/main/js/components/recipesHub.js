import React from 'React';
import ExternalRecipeLookup from "./externalRecipeLookup"
import ManualRecipe from "./manualRecipe";
import MealPlanner from './mealPlanner';
import RecipeList from './recipeList';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const RecipesHub = (props) => {
    const classes = useStyles();

    const saveRecipeToMealPlanner = () => {
        return (
            null
        );
    }

    return (
        <div className='container'>
            <div className={classes.toolbar}/>
            <h1>Recipes Hub</h1>
            <ExternalRecipeLookup user={props.user} refreshUser={props.refreshUser}/>
            <hr />
            {props.user ?  <ManualRecipe user={props.user} refreshUser={props.refreshUser}/> : <div>Loading...</div>}
            <hr />
            
            <hr />
            <MealPlanner user={props.user} refreshUser={props.refreshUser}/>
        </div>
    );
}

export default RecipesHub;