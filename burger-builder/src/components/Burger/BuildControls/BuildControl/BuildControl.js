import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
    // the More button needs to add ingredients so we tak the props of added and give it to the onClick handler of that button
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                className={classes.Less}
                onClick={props.removed}
                disabled={props.disabled}
            >
                Less
            </button>
            <button className={classes.More} onClick={props.added}>
                More
            </button>
        </div>
    );
};

export default BuildControl;
