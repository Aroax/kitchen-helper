import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from "@material-ui/core/Grid";

const actionButtons = ({ shopButtonTitle, cookButtonTitle, planButtonTitle, shopButtonClick, cookButtonClick, planButtonClick }) => {
    return (
        <Grid container direction='row' spacing={1}>
            <Grid item>
                <Tooltip title={shopButtonTitle}>
                    <IconButton aria-label={shopButtonTitle} onClick={shopButtonClick} color="secondary">
                        <AddShoppingCartIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title={cookButtonTitle}>
                    <IconButton aria-label={cookButtonTitle} onClick={cookButtonClick} color="secondary">
                        <RestaurantIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title={planButtonTitle}>
                    <IconButton aria-label={planButtonTitle} onClick={planButtonClick} color="secondary">
                        <EventIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
}

export default actionButtons;