import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current Price: <strong>{props.price.toFixed(2)}</strong>
            </p>
            {controls.map((ctrl) => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    // need to pass the type to the ingredient, but need es6 function and pass back the loop of ctrl type, the function takes a 'type' as an argument
                    added={() => props.ingredientAdded(ctrl.type)}
                    // hook up the removed ingredient function to buildcontrols and then activate button
                    removed={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                // should only be set to true if the order is not purchasable
                disabled={!props.purchasable}
            >
                ORDER NOW
            </button>
        </div>
    );
};

export default BuildControls;
