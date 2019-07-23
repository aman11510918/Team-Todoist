import React, { Component } from 'react';
const token = "93b6caac34a82a2e2d8f1d57d9f5143516e2721c";

export default class Projects extends Component {

  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  allProjects = () => {
    fetch('https://api.todoist.com/rest/v1/projects', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((request) => {
      if (request.ok) return request.json();
    })
    .then((response) => {
      const projects = [];
      projects.push(response);
      this.setState({ projects })
    })
    .then(() => {
      console.log('success', this.state.projects)
    })
  }

  componentDidMount() {
    this.allProjects();
    // this.createProject()
    // this.updateProjectGivenID()
    // this.getProjectGivenID()
    // this.deleteProjectGivenID()
  }

  createProject = () => {
    const newProjectName = 'temporary Project'
    fetch('https://api.todoist.com/rest/v1/projects', {
      method: 'POST',
      body: JSON.stringify({name: newProjectName}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((request) => {
      if (request.ok) return request.json();
    })
    .then((response) => {
      console.log('successfully created project:', response);
    })
  }

  getProjectGivenID = () => {
    const projectID=2213597103;
    fetch(`https://api.todoist.com/rest/v1/projects/${projectID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((request) => {
      if (request.ok) return request.json();
    })
    .then((response) => {
      console.log(`project with id ${projectID}:`, response)
    })
  }

  updateProjectGivenID = () => {
    const projectID = 2213986821, newProjectName='new temporary project after update'
    fetch(`https://api.todoist.com/rest/v1/projects/${projectID}`, {
      method: 'POST',
      body: JSON.stringify({name: newProjectName}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(() => {
      console.log('successfully updated.');
    })
  }

  deleteProjectGivenID = () => {
    const projectID=2213986821;
    fetch(`https://api.todoist.com/rest/v1/projects/${projectID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      console.log('successfully deleted project with id:', projectID)
    })
  }

  render() {
    return (
      <>
      {this.state.projects.map(project =>
        console.log(this.state.projects)
      )}
        
      </>
    );
  }
}
