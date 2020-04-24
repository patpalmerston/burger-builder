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
            {controls.map((ctrl) => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    // need to pass the type to the ingredient, but need es6 function and pass back the loop of ctrl type, the function takes a 'type' as an argument
                    added={() => props.ingredientAdded(ctrl.type)}
                />
            ))}
        </div>
    );
};

export default BuildControls;
