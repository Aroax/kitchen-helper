import React from "react";

const Recipe = (props) => {

  return (
      <tr>
        <td><img src={props.data.recipe.image} height="200px" width="250px"></img></td>
        <td><a href={props.data.recipe.url}>{props.data.recipe.label}</a></td>
      </tr>
  )
}

export default Recipe;
