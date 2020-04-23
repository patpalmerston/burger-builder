import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    // need to change the props object into an Array
    // Then also duplicate as many of the keys as they have number values('cheese: 2') = two cheeses
    const transformedIngredients = Object.keys(props.ingredients).map(
        (igKey) => {
            //return a copy, array that holds as many keys given by props
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // creating a unique key for each duplicate ingredient
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        }
    );
    console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;
