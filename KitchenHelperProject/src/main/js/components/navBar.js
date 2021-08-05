// import { NavLink } from "react-router-dom";
// import React from "react";

// const navBar = () => {
//     return (
//         <nav>
//             <NavLink to='/' exact={true}>Pantry</NavLink>
//             <NavLink to='/recipes'>Recipes</NavLink>
//             <NavLink to='/shopping-list'>Shopping</NavLink>
//         </nav>

//     );
// }

// export default navBar;

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import { Link as RouterLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//     navContainer: {
//         display: "flex",
//         flexGrow: 1
//     },
//     appBar: {
//         width: "100%"
//     },
//     profileIcon: {
//         marginRight: theme.spacing(2)
//     },
//     navLinks: {
//         flexGrow: 1
//     },
//     navLink: {
//         fontSize: "14px",
//         color: "#333",
//         textDecoration: "none",
//         marginLeft: "12px"
//     },
//     navLinkActive: {
//         borderBottom: "2px solid #333"
//     }
// }));

// export default function navBar() {
//     const classes = useStyles();

//     return (
//         <div className={classes.navContainer}>
//             <CssBaseline />
//             <AppBar position="fixed">
//                 <Toolbar disableElevation>
//                     <IconButton
//                         edge="start"
//                         className={classes.profileIcon}
//                         color="inherit"
//                         aria-label="profile"
//                         component={RouterLink}
//                         to="/profile"
//                     >
//                         <AccountCircle />
//                     </IconButton>
//                     <Typography className={classes.navLinks}>
//                         <NavLink
//                             to="/"
//                             exact={true}
//                             className={classes.navLink}
//                             activeClassName={classes.navLinkActive}
//                         >
//                             PANTRY
//                         </NavLink>
//                         <NavLink
//                             to="/recipes"
//                             className={classes.navLink}
//                             activeClassName={classes.navLinkActive}
//                         >
//                             RECIPES
//                         </NavLink>
//                         <NavLink
//                             to="/shopping-list"
//                             className={classes.navLink}
//                             activeClassName={classes.navLinkActive}
//                         >
//                             SHOPPING
//                         </NavLink>
//                         <NavLink to='/saved' className={classes.navLink}
//                             activeClassName={classes.navLinkActive}>Saved Recipes</NavLink>
//                         <NavLink to='/favourites' className={classes.navLink}
//                             activeClassName={classes.navLinkActive}>Favourite Recipes</NavLink>
//                     </Typography>
//                     <Button color="inherit">Logout</Button>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     );
// }

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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

const drawerWidth = 240;

export default function LeftDrawerNav(props) {
  const classes = useStyles();
  const { window } = props;
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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
        >
          <MenuItem button key="Pantry">
            <ListItemIcon>
              <KitchenIcon />
            </ListItemIcon>
            PANTRY
          </MenuItem>
        </NavLink>
        <NavLink
          to="/recipes"
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
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
            to="/saved"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            <MenuItem button key="Saved">
              Saved
            </MenuItem>
          </NavLink>
          <NavLink
            to="/favourites"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            <MenuItem>Favourite</MenuItem>
          </NavLink>
          <NavLink
            to="/custom"
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
          >
            <MenuItem>Custom</MenuItem>
          </NavLink>
        </MenuList>
        <NavLink
          to="/shopping-list"
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
        >
          <MenuItem button key="Shopping">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            SHOPPING
          </MenuItem>
        </NavLink>
        <NavLink
          to="/profile"
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
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
      <MenuList></MenuList>
    </div>
  );

  return (
    <div className={classes.navContainer}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar disableElevation>
          <Typography className={classes.navLinks}>Kitchen Helper</Typography>
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
}));
