import AddProject from './addProjects';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Popover, Button, Icon, Modal } from 'antd';

const { confirm } = Modal;
const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";

class ProjectContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}
	componentDidMount() {
		this.getData();
	}

	getData = async () => {
		return await fetch('https://api.todoist.com/rest/v1/projects', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
			.then((request) => {
				if (request.ok) {
					return request.json();
				}
			})
			.then((response) => {
				this.setState({ projects: response });
			})
	}
	createProject = (newData) => {
		const newProjectName = newData.content;

		fetch('https://api.todoist.com/rest/v1/projects', {
			method: 'POST',
			body: JSON.stringify({ name: newProjectName }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			}
		})
			.then((request) => {
				if (request.ok) return request.json();
				else {
					console.log("Can't Fetch from Server.");
				}
			})
			.then((response) => {
				const projects = this.state.projects.slice();
				projects.push(response);
				this.setState({ projects });
			})
	}
	handleDelete = async (projectId) => {
		let array = [...this.state.projects];
		const url = `https://api.todoist.com/rest/v1/projects/${projectId}`;
		await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		let newDeleted = array.filter(data => data.id !== projectId);
		this.setState({ projects: newDeleted })
	}

	showDeleteConfirm = (data) => {
		confirm({
			title: 'Are you sure, you want to delete ?',
			content: `${data.name}`,
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk: () => {
				this.handleDelete(data.id);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	handleEditOnClick = (event) => {
		console.log(event);

		
	}

	render() {
		const result = this.state.projects.filter(project => project.name !== "Inbox")
		return (
			<>
				{result.map(value =>
				
					
					<li key={value.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Link to={ { pathname: `/project/${value.id}`, state: { projectName: value.name } } }>
							<div key={value.id}>
							{value.name}
						</div></Link>
						<div style={{ clear: 'both', whiteSpace: 'wrap' }}>
							<Popover
								width='120'
								placement="bottomLeft"
								trigger="focus"
								content={
									<div>
										<Button type="link" style={{ color: '#333333' }} onClick={() => {this.handleEditOnClick}}><Icon type='edit' style={{ color: 'gray' }} />Edit Task</Button>
										<br />
										<Button type='link' style={{ color: '#333333' }} onClick={() => this.showDeleteConfirm(value)}><Icon type='delete' style={{ color: 'red' }} />Delete Task</Button>
									</div>
								}
							>
								<Button type='link' style={{ color: 'black', margin: ' 0px 0px 8px 0px' }}>. . .</Button>
							</Popover>
						</div>
					</li>
					 
				)}
				<AddProject onAddSubmit={this.createProject} />
			</>
		);
	}
}

export default ProjectContent;