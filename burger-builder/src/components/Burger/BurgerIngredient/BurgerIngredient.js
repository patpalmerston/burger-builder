import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
    render() {
        // creating empty variable to house the switch content
        let ingredient = null;
        // get ingredients via props, switch from prop to prop
        // type is a prop we will receive
        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className={classes.BreadBottom}></div>;
                break;

            case 'bread-top':
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.seeds1}></div>
                        <div className={classes.seeds2}></div>
                    </div>
                );
                break;

            case 'meat':
                ingredient = <div className={classes.Meat}></div>;
                break;

            case 'cheese':
                ingredient = <div className={classes.Cheese}></div>;
                break;

            case 'salad':
                ingredient = <div className={classes.Salad}></div>;
                break;

            case 'bacon':
                ingredient = <div className={classes.Bacon}></div>;
                break;
            // starts and finishes as null by default
            default:
                ingredient = null;
        }
        // return the ingredient that was given
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
