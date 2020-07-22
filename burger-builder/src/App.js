import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    {/* with out the switch we would use exact to get the home page, but with switch it give us one hit at a time, but homepage needs to be last as if it hits the slash prefix it stops searching for the path */}
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/' component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
