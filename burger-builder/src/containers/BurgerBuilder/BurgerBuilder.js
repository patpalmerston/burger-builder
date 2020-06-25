import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients: null,
        // keep track of original price
        totalPrice: 4,
        // this new boolean becomes true once we have atleast one item on the burger
        purchasable: false,
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        axios
            .get(
                'https://react-burger-builder-707.firebaseio.com/ingredients.json'
            )
            .then((res) => {
                this.setState({ ingredients: res.data });
            })
            .catch();
    }

    // use this method to check wether we should change purchasable to true or false
    updatePurchaseState(ingredients) {
        // turn object keys into an array to add together
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    };

    // need to access the boolean to switch from true to false on the click of the order button
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // alert('you Continue');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            // recalculate price on the server at some point
            price: this.state.totalPrice,
            customer: {
                name: 'Pat Palmerston',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '3432434',
                    country: 'ala',
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
        };
        axios
            .post('/orders.json', order)
            .then((res) => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch((err) => {
                this.setState({ loading: false, purchasing: false });
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
        let orderSummary = null;

        let burger = <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
