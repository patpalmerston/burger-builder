import React from 'react';
import Aux from '../../hoc/Auxillary';

const Layout = (props) => {
    return (
        <Aux>
            <p>Toolbar, SideDrawer, Backdrop</p>
            <main>{props.children}</main>
        </Aux>
    );
};

export default Layout;
