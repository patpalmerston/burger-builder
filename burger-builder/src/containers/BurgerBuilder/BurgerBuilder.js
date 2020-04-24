import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';

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
            cheese: 2,
            meat: 0,
        },
    };
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
