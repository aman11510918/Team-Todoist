import React, { Component } from 'react';
import Today from './Today';
import NextDays from './NextDays';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './HomePage';

class RoutesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <Router>
                <div>
                    <Switch>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/today"} component={Today}/>
                    <Route path={"/nextdays"} component={NextDays} />
                    </Switch>

                </div>
            </Router>
        );
    }
}
const Home = () => (
        <div>
            <HomePage />
        </div>
    );
 
export default RoutesFilter;