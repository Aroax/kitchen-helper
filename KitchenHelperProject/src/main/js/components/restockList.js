import React from 'react';
import IngredientCard from './ingredient';

const RestockList = (props) => {
    console.log('props in restock', props);
    const getRestockIngredients = () => {
        return (
            props.restockList.map(() => {
                return (
                    <div>
                        <IngredientCard data={ingredient} userId={props.user.id} weight={ingredient.weight} foodCategory={ingredient.foodCategory} />
                    </div>
                )

            })
        )
    }

    const View = () => {
        return (
            <div className='container'>
                <h2>Heads up! You've run out of these, would you like to add any to your shopping list?</h2>
                {getRestockIngredients}
                <br></br>
                <hr />
                <br></br>
            </div>
        );
    }


    const output = props.restockList.length > 0 ? <View /> : null


    return (
        <div>
            {/* {output} */}
            <View />
        </div>
    );
}

export default RestockList;