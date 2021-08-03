import React from "react";
import axios from "axios";

const Ingredient = (props) => {
  // const addToShoppingList = () => {
  //   console.log(props);
  //
  //   axios({
  //     method: 'patch',
  //     url: `/users/${props.userId}/shopping-list/add`,
  //     headers: { 'Content-Type': 'application/json' },
  //     data: props.data
  //   }).then((response) => {
  //       console.log(response);
  //       location.reload();
  //   })
  // }

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

  return (
    <tr>
      <td><img src={props.data.imageUrl} height="200px" width="250px"></img></td>
      <td>{props.data.name}</td>
      <td>{props.data.foodCategory}</td>
      <td>{expiryCalculator()}</td>
      <td>{props.data.location}</td>
      <td>{props.data.weight}g</td>
      <td>{props.data.weightNeeded}g</td>
    </tr>
  )
}

export default Ingredient;
