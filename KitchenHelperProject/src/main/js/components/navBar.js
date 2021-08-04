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

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navContainer: {
        display: "flex",
        flexGrow: 1
    },
    appBar: {
        width: "100%"
    },
    profileIcon: {
        marginRight: theme.spacing(2)
    },
    navLinks: {
        flexGrow: 1
    },
    navLink: {
        fontSize: "14px",
        color: "#333",
        textDecoration: "none",
        marginLeft: "12px"
    },
    navLinkActive: {
        borderBottom: "2px solid #333"
    }
}));

export default function navBar() {
    const classes = useStyles();

    return (
        <div className={classes.navContainer}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar disableElevation>
                    <IconButton
                        edge="start"
                        className={classes.profileIcon}
                        color="inherit"
                        aria-label="profile"
                        component={RouterLink}
                        to="/profile"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Typography className={classes.navLinks}>
                        <NavLink
                            to="/"
                            exact={true}
                            className={classes.navLink}
                            activeClassName={classes.navLinkActive}
                        >
                            PANTRY
                        </NavLink>
                        <NavLink
                            to="/recipes"
                            className={classes.navLink}
                            activeClassName={classes.navLinkActive}
                        >
                            RECIPES
                        </NavLink>
                        <NavLink
                            to="/shopping-list"
                            className={classes.navLink}
                            activeClassName={classes.navLinkActive}
                        >
                            SHOPPING
                        </NavLink>
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
