import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import clsx from "clsx";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import PinDropIcon from '@material-ui/icons/PinDrop';

const useStyles = makeStyles((theme) => ({
  ingrContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 400,
    borderRadius: "7px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    textAlign: "left",
    display: "flex",
    alignItems: "center"
  },
  image: {
    minWidth: 200
  },
  controls: {
    display: "flex",
    alignItems: "flex-start",
    paddingLeft: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  verticalDiv: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  btn: {
    maxWidth: "100px"
  },
  red: {
    borderColor: "#f70415"
  },
  green: {
    borderColor: "#93f850"
  },
  yellow: {
    borderColor: "#f6e018"
  }
}));

export default function IngredientCard(props) {
  const classes = useStyles();

  // const [condition, setCondition] = React.useState("");
  // const [isFresh, setIsFresh] = React.useState(false);
  // const [isImminent, setIsImminent] = React.useState(false);
  // const [isExpired, setIsExpired] = React.useState(false);


  const [weightNeeded, setWeightNeeded] = React.useState(props.data.weightNeeded);

  const handleWeightNeededChange = (event) => {
    props.updateWeightNeeded(props.data.foodId, event.target.value);
    setWeightNeeded(event.target.value);
  };

  const expiryCalculator = () => {
    const expiryDate = new Date(props.data.expiry)
    const today = new Date();
    const diff = expiryDate - today;
    let remainingDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return remainingDaysFormatter(remainingDays);
  }

  const remainingDaysFormatter = (days) => {
    if ((days <= 15) && (days > 0)) {
      // setCondition("yellow");
      // setIsImminent(true)
      return `${days}d`;
    }
    else if (days === 0) {
      // setCondition("expired");
      // setIsExpired(true)
      return `today`;
    }
    else if (days < 0) {
      // setCondition("expired");
      // setIsExpired(true)
      return `expired`;
    }
    else if (days > 15 && days < 23) {
      // setCondition("fresh");
      // setIsFresh(true)
      return `3w`;
    }
    else if (days > 23 && days < 30) {
      return `4w`;
    }
    else if (days > 30 && days < 90) {
      return `1mo+`;
    }
    else if (days > 90 && days < 180) {
      return `3mo+`;
    }
    else if (days > 180 && days < 365) {
      return `6mo+`;
    }
    else if (days > 365) {
      return `1y+`;
    }
  }

  const getClassNames = () => {
    if (condition === "expired") {
      return `${classes.ingrContainer} ${classes.red}`;
    } else if (condition === "fresh") {
      return `${classes.ingrContainer} ${classes.green}`;
    } else if (condition === "imminent") {
      return `${classes.ingrContainer} ${classes.yellow}`;
    } else if (condition === "") {
      return `${classes.ingrContainer}`
    }
  };

  const foodCategory = props.foodCategory ? props.foodCategory : null;
  const location = props.location ? props.location : null;
  const weight = props.weight ? `${props.weight}g total` : null;
  // const weightNeeded = props.weightNeeded ? `${props.weightNeeded}g needed` : null;

  // console.log('ing props', props)

  return (
    // <Card className={getClassNames()}>
    <Card className={`${classes.ingrContainer}`}>
      {/* <Card className={clsx(classes.ingrContainer, {[classes.red]: isExpired, [classes.green]: !isExpired})}> */}
      <div className={classes.details}>
        <CardContent>
          <Grid container className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.data.name}
            </Typography>
            {/* <Divider
              className={classes.verticalDiv}
              orientation="vertical"
              flexItem
            /> */}
            <Typography variant="subtitle1" color="textSecondary">
              -{weight}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.type === "shopping-list"
                ? (
                  <td><input value={weightNeeded} onChange={handleWeightNeededChange}></input>g</td>
                )
                : (
                  <td>{props.data.weightNeeded}g</td>
                )
              }
            </Typography>

          </Grid>
          <Grid item className={classes.row}>
            <Grid item>
              <AccessTimeIcon color="secondary" style={{ marginRight: "5" }} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">{expiryCalculator()}</Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.row}>
            <Grid item>
              <PinDropIcon color="secondary" style={{ marginRight: "5" }} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">{location}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider variant="middle" />
        <div className={classes.controls}>
          <CardActions>
            <Button
              href=""
              variant="outlined"
              size="small"
              color="secondary"
              disableElevation
              className={classes.btn}
            >
              Edit
            </Button>
            <Button href="" size="small" disableElevation>
              Delete
            </Button>
          </CardActions>
        </div>
      </div>
      <CardMedia
        className={classes.image}
        image={props.data.imageUrl}
        title={props.data.name}
      />
    </Card>
  );
}
