import React from "react";

const Ingredient = (props) => {
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
      return `${days}d`;
    }
    else if (days === 0) {
      return "today";
    }
    else if (days < 0) {
      return "expired";
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
  const foodCategory = props.foodCategory ? props.foodCategory : null;
  const location = props.location ? props.location : null; 
  const weight = props.weight ? `${props.weight}g total` : null; 
  // const weightNeeded = props.weightNeeded ? `${props.weightNeeded}g needed` : null;  

  console.log('ing props', props)
  return (
    <tr>
      <td><img src={props.data.imageUrl} height="200px" width="250px"></img></td>
      <td>{props.data.name}</td>
      {/* <td>{props.data.foodCategory}</td> */}
      <td>{expiryCalculator()}</td>
      {/* <td>{props.data.location}</td>
      <td>{props.data.weight}g</td>
      <td>{props.data.weightNeeded}g</td> */}

      <td>{foodCategory}</td>
      <td>{location}</td>
      <td>{weight}</td>
      {/* <td>{weightNeeded}</td> */}
      { props.type === "shopping-list" 
          ? (
            <td><input value={weightNeeded} onChange={handleWeightNeededChange}></input>g</td>
          ) 
          : (
            <td>{props.data.weightNeeded}g</td>
          )
        }     
    </tr>
  )
}

export default Ingredient;
