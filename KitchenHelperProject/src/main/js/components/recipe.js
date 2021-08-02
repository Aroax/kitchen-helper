import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Divider from "@material-ui/core/Divider";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  recipeCardContainer: {
    maxWidth: 350
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: theme.spacing(2)
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: "18px",
    textAlign: "left"
  }
}));

const recipeCard = (props)  =>{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const ingredients = props.data.recipe.ingredients;

  const addToFavourites = () => {
    event.preventDefault();
    axios({
      method: 'patch',
      url: `/users/${props.userId}/recipes/favourite-recipes/add`,
      headers: { 'Content-Type': 'application/json' },
      data: props.data
    }).then((response) => {
        console.log(response);
    })
    // setTimeout(location.reload.bind(location), 3000);
  }

  return (
    <Card className={classes.recipeCardContainer}>
      <CardMedia
        className={classes.media}
        image={props.data.recipe.image}
        title={props.data.recipe.label}
      />
      <CardContent>
        <Typography component="h5" variant="button" className={classes.title}>
          {props.data.recipe.label}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          align="left"
        >
          X missing ingredients
        </Typography>
      </CardContent>
      <Grid className={classes.iconsContainer} spacing={1}>
        <Grid container className={classes.row} spacing={1}>
          <Grid item>
            <PeopleAltIcon color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              serves {props.data.recipe.yield}
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container className={classes.row} spacing={1}>
          <Grid item>
            <AccessTimeIcon color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              5 mins
            </Typography>
          </Grid>
        </Grid> */}
        <Grid container className={classes.row} spacing={1}>
          <Grid item>
            <MenuBookIcon color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              {props.data.recipe.ingredients.length}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={addToFavourites}>
          <FavoriteIcon color="#ff0000" />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <AddShoppingCartIcon color="secondary" />
        </IconButton>
        <Button href={props.data.recipe.url} size="small" color="secondary" disableElevation>
          view recipe
        </Button>
        <IconButton
          color="secondary"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider />
          <Typography variant="overline">Ingredients</Typography>
          <Divider />
          <Typography paragraph>
            {
              ingredients.map((ingr) => (
                <ListItem>
                  <ListItemIcon>-</ListItemIcon>
                  <Typography variant="subtitle2">{ingr.text}: {Math.round(ingr.weight)}g</Typography>
                  {/* foodID = {ingr.foodId} */}
                </ListItem>
              ))
            }
          </Typography>
          <Divider />
          <Typography variant="overline">Source</Typography>
          <Divider />
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ paddingTop: 5 }}
          >
            {props.data.recipe.source}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default recipeCard;