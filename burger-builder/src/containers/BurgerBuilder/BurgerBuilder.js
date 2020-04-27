import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// this is a global variable so we call it outside of the component, global variable are usually all uppercase
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};
// need to add status so that we can change the state depending on the ingredients selected, which we can then pass to the burger component
class BurgerBuilder extends Component {
    // below is legacy state constructor
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }
    // moder state constructor
    // start with hard coding a state object that has needed ingredients
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        // keep track of original price
        totalPrice: 4,
    };

    addIngredientHandler = (type) => {
        // need to know what old ingredient count it, for given type
        const oldCount = this.state.ingredients[type];
        // calculate oldCount plus one for new count
        const updatedCount = oldCount + 1;
        // state updated in immutable way by creating a copy of old state in new variable to be manipulated
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        // access type and set count of new state to the updatedCount
        updatedIngredients[type] = updatedCount;
        //update the ingredients in the state, but we need to keep track of price
        // update total price with the price of the type, we only ever add one unit at a time
        const priceAddition = INGREDIENT_PRICES[type];
        // get our old price
        const oldPrice = this.state.totalPrice;
        // now get our new price by adding our old price with the priceAddition
        const newPrice = oldPrice + priceAddition;
        // now update the totalPrice state with the newPrice and the ingredients state with the updatedIngredients
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
    };

    removeIngredientHandler = (type) => {
        // need to know what old ingredient count it, for given type
        const oldCount = this.state.ingredients[type];
        // if we have 0 ingredients of that type and we click it will just return as is, nothing happens getting rid of the error
        if (oldCount <= 0) {
            return;
        }
        // calculate oldCount minus one for the new count
        const updatedCount = oldCount - 1;
        // state updated in immutable way by creating a copy of old state in new variable to be manipulated
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        // access type and set count of new state to the updatedCount
        updatedIngredients[type] = updatedCount;
        //update the ingredients in the state, but we need to keep track of price
        // update total price with the price of the type, we only ever add one unit at a time
        const priceDeduction = INGREDIENT_PRICES[type];
        // get our old price
        const oldPrice = this.state.totalPrice;
        // now get our new price by adding our old price with the priceDeduction
        const newPrice = oldPrice - priceDeduction;
        // now update the totalPrice state with the newPrice and the ingredients state with the updatedIngredients
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
    };

    render() {
        // copy state in an immutable way
        const disabledInfo = {
            ...this.state.ingredients,
        };
        // turning disabledInfro into a boolean value that we disable the button from for styling purposes
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
