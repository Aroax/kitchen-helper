import React from 'react';

const Form = (props) => {

  return (
    <div>
      <form>
        <input type="text" placeholder="Name" onChange={props.onNameChange}></input>
        <input type="text" placeholder="Food Category" onChange={props.onFoodCategoryChange}></input>
        <input type="text" placeholder="Storage Location" onChange={props.onLocationChange}></input>
        <input type="text" placeholder="Weight in grams" onChange={props.onWeightChange}></input>
        <input type="hidden" placeholder="Image URL" onChange={props.onImageUrlChange}></input>
      </form>
      <button onClick={props.onButtonClick}>Add To Pantry</button>
    </div>
  )
}

export default Form;
