import React from "react";

const Ingredient = (props) => {
  return (
      <tr>
        <td><img src={props.data.imageUrl} height="200px" width="250px"></img></td>
        <td>{props.data.name}</td>
        <td>{props.data.foodCategory}</td>
        <td>{props.data.location}</td>
        <td>{props.data.weight}g</td>
      </tr>
  )
}

export default Ingredient;
