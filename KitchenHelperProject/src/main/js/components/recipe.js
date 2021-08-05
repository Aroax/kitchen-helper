import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import { Card, Link, CardMedia, CardContent, Typography, Grid, Button, IconButton, ListItem, ListItemIcon, CardActions, Collapse, Divider, } from "@material-ui/core";
// import { ExpandMoreIcon, PeopleAltIcon, AccessTimeIcon, MenuBookIcon, PostAddIcon, FavoriteIcon } from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Divider from "@material-ui/core/Divider";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const recipeCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ingredients = props.data.recipe.ingredients.map((ingredient) => {
    return {
      foodId: ingredient.foodId,
      name: ingredient.text,
      weight: Math.ceil(ingredient.weight),
      weightNeeded: Math.ceil(ingredient.weight),
      imageUrl: ingredient.image,
      foodCategory: ingredient.foodCategory,
      text: ingredient.text,
    };
  });

  const getEdamamRecipeId = () => {
    let edamamRecipeUri = props.data.recipe.uri;
    let splitUri = edamamRecipeUri.split("_");
    return splitUri[1];
  };

  const addToSavedRecipes = () => {
    console.log(props.data.recipe);
    axios({
      method: "patch",
      url: `/users/${props.userId}/recipes/saved/add`,
      headers: { "Content-Type": "application/json" },
      data: {
        recipeName: props.data.recipe.label,
        recipeId: getEdamamRecipeId(),
        ingredients: ingredients,
        image: props.data.recipe.image,
        yield: props.data.recipe.yield,
        url: props.data.recipe.url,
        source: props.data.recipe.source,
      },
    }).then((response) => {
      console.log(response);
    });
    // setTimeout(location.reload.bind(location), 3000);
  };

  // Button Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonMenu = (
    <div>
      <IconButton aria-controls="more-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Add recipe to shopping list</MenuItem>
        <MenuItem onClick={handleClose}>Cook now (subtract ingredients)</MenuItem>
        <MenuItem onClick={handleClose}>Add to meal planner</MenuItem>
      </Menu>
    </div>
  )

  return (
    <Card className={classes.recipeCardContainer}>
      <Link href={props.data.recipe.url}>
        <CardMedia
          className={classes.media}
          image={props.data.recipe.image}
          title={props.data.recipe.label}
        />
      </Link>
      <CardContent>
        <Typography component="h5" variant="button" className={classes.title}>
          {props.data.recipe.label}
        </Typography>
        {/* <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          align="left"
        >
          X missing ingredients
        </Typography> */}
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
        <Grid container className={classes.row} spacing={1}>
          <Grid item>
            <MenuBookIcon color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              {props.data.recipe.ingredients.length} ingr
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to my recipes" onClick={addToSavedRecipes}>
          <PostAddIcon color="#secondary" />
        </IconButton> */}
        {props.button ? (
          props.button
        ) : (
          <Button
            onClick={addToSavedRecipes}
            variant="contained"
            size="small"
            color="primary"
            disableElevation
            style={{ marginRight: 8 }}
            aria-label="add to my recipes"
          >
            save
          </Button>
        )}
        {props.actionButtons ? buttonMenu : null}
        {/* <Button
          onClick={props.onMealPlannerClick}
          size="small"
          variant="outlined"
          color="default"
          disableElevation
          aria-label="add to meal planner"
        >
          add to meal planner
        </Button> */}
        {/* {buttonMenu} */}
        <IconButton
          color="secondary"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
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
            {ingredients.map((ingr) => (
              <ListItem>
                <ListItemIcon>-</ListItemIcon>
                <Typography variant="subtitle2">
                  {ingr.text}: {Math.round(ingr.weight)}g
                </Typography>
                {/* foodID = {ingr.foodId} */}
              </ListItem>
            ))}
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
};

export default recipeCard;

const useStyles = makeStyles((theme) => ({
  recipeCardContainer: {
    maxWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: "18px",
    textAlign: "left",
  },
}));
