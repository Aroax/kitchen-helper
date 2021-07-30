import React from "react";
import axios from "axios";

const Ingredient = (props) => {
  const addToShoppingList = () => {
    console.log(props);

    axios({
      method: 'patch',
      url: `/users/${props.userId}/shopping-list/add`,
      headers: { 'Content-Type': 'application/json' },
      data: props.data
    }).then((response) => {
        console.log(response);
        location.reload();
    })
  }

  return (
      <tr>
        <td><img src={props.data.imageUrl} height="200px" width="250px"></img></td>
        <td>{props.data.name}</td>
        <td>{props.data.foodCategory}</td>
        <td>{props.data.location}</td>
        <td>{props.data.weight}g</td>
        <td><button onClick={addToShoppingList}>Add to Shopping List</button></td>
      </tr>
  )
}

export default Ingredient;
