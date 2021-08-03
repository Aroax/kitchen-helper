import React from "react";

const Ingredient = (props) => {
  const [weightNeeded, setWeightNeeded] = React.useState(props.data.weightNeeded);

  const handleWeightNeededChange = (event) => {
    props.updateWeightNeeded(props.data.foodId, event.target.value);
    setWeightNeeded(event.target.value);
  };

  return (
      <tr>
        <td><img src={props.data.imageUrl} height="200px" width="250px"></img></td>
        <td>{props.data.name}</td>
        <td>{props.data.foodCategory}</td>
        <td>{props.data.location}</td>
        <td>{props.data.weight}g</td>
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
