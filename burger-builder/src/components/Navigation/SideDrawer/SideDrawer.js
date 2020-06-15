import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from '../SideDrawer/SideDrawer.module.css';
// function body {}
// return straight JSX ()
const SideDrawer = () => {
    return (
        <div className={classes.SideDrawer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default SideDrawer;
