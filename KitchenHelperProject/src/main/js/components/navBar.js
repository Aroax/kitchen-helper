import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import KitchenIcon from "@material-ui/icons/Kitchen";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import PersonIcon from "@material-ui/icons/Person";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import EventNoteIcon from '@material-ui/icons/EventNote';
import { CardMedia } from "@material-ui/core";
// import thumbnailLogo from '../../../resources/static/images/stocrates-logo-trans-splat.png'

const drawerWidth = 240;

export default function LeftDrawerNav(props) {
  const classes = useStyles();
  const { window } = props;
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // const mediumLogo = "https://images2.imgbox.com/6c/98/kXicK4Zr_o.png"; 

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  
  const drawer = (
    <div>
      <MenuList>
        <NavLink
          to="/"
          exact={true}
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          onClick={handleDrawerToggle}
        >
          <MenuItem button key="Pantry">
            <ListItemIcon>
              <KitchenIcon />
            </ListItemIcon>
            PANTRY
          </MenuItem>
        </NavLink>
        <NavLink
          to="/favourites"
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          onClick={handleDrawerToggle}
        >
          <MenuItem button key="Recipes">
            <ListItemIcon>
              <RestaurantMenuIcon />
            </ListItemIcon>
            RECIPES
          </MenuItem>
        </NavLink>
        <MenuList className={classes.nested}>
          <NavLink
            to="/search-recipes"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            onClick={handleDrawerToggle}
          >
            <MenuItem button key="Saved">
              Search
            </MenuItem>
          </NavLink>
          <NavLink
            to="/saved"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            onClick={handleDrawerToggle}
          >
            <MenuItem button key="Saved">
              Saved
            </MenuItem>
          </NavLink>
          {/* <NavLink
            to="/favourites"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            onClick={handleDrawerToggle}
          >
            <MenuItem>Favourites</MenuItem>
          </NavLink> */}
          <NavLink
            to="/custom"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
            onClick={handleDrawerToggle}
          >
            <MenuItem>Custom</MenuItem>
          </NavLink>
        </MenuList>
        <NavLink
          to="/shopping-list"
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          onClick={handleDrawerToggle}
        >
          <MenuItem button key="Shopping">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            SHOPPING
          </MenuItem>
        </NavLink>
        <NavLink
          to="/meal-planner"
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          onClick={handleDrawerToggle}
        >
          <MenuItem button key="Mealplanner">
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            MEAL PLANNER
          </MenuItem>
        </NavLink>
        <NavLink
          to="/profile"
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          onClick={handleDrawerToggle}
        >
          <MenuItem button key="Profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            PROFILE
          </MenuItem>
        </NavLink>
      </MenuList>
      <Divider />
    </div>
  );

  return (
    <div className={classes.navContainer}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar disableElevation>
          {/* <Typography className={classes.navLinks}>Kitchen Helper</Typography> */}
          <CardMedia className={classes.logoThumb}
        image='https://images2.imgbox.com/cc/6c/aQ608XI0_o.png'
        title="Stocrates Logo"
      />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={drawerOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  navContainer: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    width: "100%",
  },
  profileIcon: {
    marginRight: theme.spacing(2),
  },
  navLinks: {
    flexGrow: 1,
  },
  navLink: {
    fontSize: "13px",
    color: "#333",
    textDecoration: "none",
  },
  navLinkActive: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: "#d3a257",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing.unit * 10,
  },
  logoThumb: {
    height: 100,
    width: 100,
    margin: 'auto',
  },
}));
