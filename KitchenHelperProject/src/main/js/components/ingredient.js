import React from "react";

const Ingredient = (props) => {
  console.log("props");
  console.log(props);

  return (
      <li>
        <p><img src={props.imageUrl}></img></p>
        <p>{props.name}</p>
        <p>{props.foodCategory}</p>
        <p>{props.location}</p>
        <p>{props.weight}g</p>
      </li>
  )
}

export default Ingredient;
