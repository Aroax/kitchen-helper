import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import PinDropIcon from '@material-ui/icons/PinDrop';

const useStyles = makeStyles((theme) => ({
  ingrContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 400,
    border: "2px solid #fff",
    borderRadius: "7px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
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
    flex: 1,
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
  blue: {
    borderColor: "#67c3f1"
  },
  grey: {
    backgroundColor: '#f0f0f0'
  }
}));

const getRemainingDays = (expiryDateString) => {
  const expiryDate = new Date(expiryDateString)
  const today = new Date();
  const diff = expiryDate - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const remainingDaysFormatter = (days) => {
  if ((days <= 15) && (days > 0)) {
    return `${days}d`;
  }
  else if (days === 0) {
    return `today`;
  }
  else if (days < 0) {
    return `expired`;
  }
  else if (days > 15 && days < 23) {
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

export default function IngredientCard(props) {
  const classes = useStyles();

  const [condition, setCondition] = React.useState("");

  React.useEffect(() => {
    let remainingDays = getRemainingDays(props.data.expiry);

    if (remainingDays < 0) {
      setCondition("expired");
    }
    else if (remainingDays >= 0 && remainingDays <= 2) {
      setCondition("due");
    }
    else if (remainingDays <= 15 && remainingDays >= 3) {
      setCondition("fresh");
    }
    else if (remainingDays > 15 && remainingDays < 30) {
      setCondition("imminent");
    }
    else {
      return
    }
  }, [props.data.expiry])

  const [weightNeeded, setWeightNeeded] = React.useState(props.data.weightNeeded);

  const handleWeightNeededChange = (event) => {
    props.updateWeightNeeded(props.data.foodId, event.target.value);
    setWeightNeeded(event.target.value);
  };

  const [expiryDate, setExpiryDate] = React.useState(props.data.expiry);

  const handleExpiryChange = (event) => {
    props.updateExpiry(props.data.foodId, event.target.value);
    setExpiryDate(event.target.value);
  }

  const getClassNames = () => {
    if (condition === "expired") {
      return `${classes.ingrContainer} ${classes.grey}`;
    } else if (condition === "due") {
      return `${classes.ingrContainer} ${classes.red}`;
    } else if (condition === "fresh") {
      return `${classes.ingrContainer} ${classes.green}`;
    } else if (condition === "imminent") {
      return `${classes.ingrContainer} ${classes.blue}`;
    } else {
      return `${classes.ingrContainer}`
    }
  };

  const foodCategory = props.foodCategory ? props.foodCategory : null;
  const location = props.location ? props.location : null;
  const weight = props.weight ? `${props.weight}g total` : null;
  const weightNeededElement = props.weightNeeded ? `${props.weightNeeded}g needed` : null;
  // console.log('ing props', props)

  return (
    <Card className={getClassNames()}>
      <div className={classes.details}>
        <CardContent>
          <Grid container direction="column" alignItems='flex-start' spacing={1}>
            <Grid item >
              <Typography component="h5" variant="h5">
                {props.data.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                {weight}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.type === "shopping-list"
                  ? (
                    <Grid item>
                      <Typography variant="caption" display="block" gutterBottom><label for="weightNeeded">Minimum weight needed </label></Typography>
                      <Typography variant="caption" display="block" gutterBottom><label for="weightNeeded">for planned recipes: </label></Typography>
                      <input value={weightNeeded} onChange={handleWeightNeededChange} />g
                      <Typography variant="caption" display="block" gutterBottom>(please edit as appropriate </Typography>
                      <Typography variant="caption" display="block" gutterBottom>for actual weight acquired)</Typography>
                    </Grid>
                  )
                  : (
                    weightNeededElement
                  )
                }
              </Typography>
            </Grid>
          </Grid>
          {props.bool ?
            (<Grid item className={classes.row}>
              <Grid item>
                <AccessTimeIcon color="secondary" style={{ marginRight: "5" }} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" color="textSecondary">{remainingDaysFormatter(getRemainingDays(props.data.expiry))}</Typography>
              </Grid>
            </Grid>)
            : null
          }
          <Grid item className={classes.row}>
            {props.type === "shopping-list"
              ? (
                <Grid item>
                  <Typography><label for="expiry">Best before:</label></Typography>
                  <input type="date" name="expiry-date" onChange={handleExpiryChange} />
                </Grid>
              )
              : (
                null
              )
            }

            {props.location ?
              (
                <Grid item className={classes.row}>
                  <Grid item>
                    <PinDropIcon color="secondary" style={{ marginRight: "5" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" color="textSecondary">{props.location}</Typography>
                  </Grid>
                </Grid>
              ) :
              (null)
            }
          </Grid>
        </CardContent>
        <Divider variant="middle" />
           <div className={classes.controls}>
           {props.type==="restock" ?
              (
                <CardActions>
                <Button size="small" disableElevation onClick={props.onShoppingClick}>
                  Add to Shopping List
                </Button>
                <Button size="small" disableElevation onClick={props.onRemoveClick}>
                  Dismiss Reminder
                </Button>
              </CardActions>
              ) :
              (<CardActions>
                {/* <Button
              href=""
              variant="outlined"
              size="small"
              color="secondary"
              disableElevation
              className={classes.btn}
            >
              Edit
            </Button> */}
                <Button size="small" disableElevation onClick={props.onRemoveClick}>
                  Remove
                </Button>
              </CardActions>)
            }
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
