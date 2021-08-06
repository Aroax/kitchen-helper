import React from 'React';
import ExternalRecipeLookup from "./externalRecipeLookup"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const RecipesHub = (props) => {
    const classes = useStyles();

    return (
        <div className='container'>
            <div className={classes.toolbar}/>
            <ExternalRecipeLookup user={props.user} refreshUser={props.refreshUser}/>
        </div>
    );
}

export default RecipesHub;
