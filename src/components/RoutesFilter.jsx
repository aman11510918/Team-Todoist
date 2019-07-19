import React, { Component } from 'react';
import NextDays from '../components/tasks/NextDays';
import Tasks from './tasks/main'
import {Switch, Route} from 'react-router-dom';
import TodayTasks from '/home/guest/programs/mb_training/Team-Todoist/src/components/tasks/TodayTasks.jsx'

class RoutesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
                <div>
                    <Switch>
                    <Route path={"/"} exact component={Tasks}/>
                    <Route path={"/today"} component={TodayTasks}/>
                    <Route path={"/nextdays"} component={NextDays} />
                    </Switch>

                </div>
        );
    }
}
 
export default RoutesFilter;