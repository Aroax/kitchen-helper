import React from 'react';

const Form = (props) => {

  return (
    <div>
      <form>
        <input type="text" placeholder="Name" value={props.name} onChange={props.onNameChange}></input>
        <input type="text" placeholder="Food Category" value={props.category} onChange={props.onFoodCategoryChange}></input>
        <label for="location"> Storage Location: </label><select value="please select" onChange={props.onLocationChange}>
           <option value="Fridge">Fridge</option>
           <option value="Freezer">Freezer</option>
           <option value="Cupboard">Cupboard</option>
        </select>
        <input type="text" placeholder="Weight in grams" defaultValue={props.weight} onChange={props.onWeightChange}></input>
        <label for="expiry">Best before:</label> <input type="date" id="start" name="expiry-date" onChange={props.onExpiryChange}></input>
        <input type="hidden" placeholder="Image URL" value={props.imageUrl} onChange={props.onImageUrlChange}></input>
      </form>
      <button onClick={props.onButtonClick}>Add To Pantry</button>
    </div>
  )
}

export default Form;