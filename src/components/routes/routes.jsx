import Tasks from '../tasks/main';
import React, { Component } from 'react';
import NextDays from '../tasks/next7DayTasks';
import { Switch, Route } from 'react-router-dom';
import TodayTasks from '../tasks/todayTasks.jsx';
import ProjectDetail from '../projects/projectDetail';

class RoutesFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				<Switch>
					<Route path={"/"} exact component={Tasks} />
					<Route path={"/today"} component={TodayTasks} />
					<Route path={"/nextdays"} component={NextDays} />
					<Route path={"/project/:id"} component={ProjectDetail} />
				</Switch>
			</div>
		);
	}
}

export default RoutesFilter;