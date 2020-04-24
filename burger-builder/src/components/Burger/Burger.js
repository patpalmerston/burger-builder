import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    // need to change the props object into an Array
    // Then also duplicate as many of the keys as they have number values('cheese: 2') = two cheeses
    const transformedIngredients = Object.keys(props.ingredients)
        .map(
            (igKey) => {
                //return a copy, array that holds as many keys given by props
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    // creating a unique key for each duplicate ingredient
                    return <BurgerIngredient key={igKey + i} type={igKey} />;
                });
            }
            // now we need to flatten the array, to check for 0 ingredients, the parent array will always have the 4 empty arrays so we need remove the arrays and turn it into one array that we can then check the length of for 0 ingredients
            // make the initial value an empty array
        )
        .reduce((arr, el) => {
            // arr is the always updated array what we want to update
            // take the element 'el' we are looping and add it to the array
            return arr.concat(el);
        }, []);
    // now we can check if the transformedIngredients array is zero and send a message
    console.log(transformedIngredients);
    // we always have a bread top and bottom? so no Protein style option?
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;
