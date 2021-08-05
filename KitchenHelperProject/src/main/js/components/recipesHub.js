import React from 'React';
import ExternalRecipeLookup from "./externalRecipeLookup"
import ManualRecipe from "./manualRecipe";
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
            <ExternalRecipeLookup user={props.user}/>
            <hr />
            {props.user ?  <ManualRecipe user={props.user} /> : <div>Loading...</div>}
            <hr />
        </div>
    );
}

export default RecipesHub;