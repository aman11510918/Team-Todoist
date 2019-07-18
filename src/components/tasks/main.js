import React, { Component } from 'react';
import AddTask from './add'
const token = "93b6caac34a82a2e2d8f1d57d9f5143516e2721c";

class Tasks extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await fetch(`https://api.todoist.com/rest/v1/tasks`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },

      });
      let result = await res.json();
      this.setState({
        isLoaded: true,
        items: result,
      });
    }
    catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }

  handleAddTask = async (newData) => {

    let task = {
      content: newData.content,
      due_date: newData.due_date
    }

    if (!newData.content) return;

    const request = await fetch('https://api.todoist.com/rest/v1/tasks', {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const response = await request.json();

    const items = this.state.items.slice();
    items.push(response);

    newData.content && this.setState({
      items: items,
    }, () => console.log('after adding new task, all tasks are:', this.state.items));
  }

  handleCheckboxChange = (props) => {

    const items = this.state.items.filter(item => item.id !== props.id);

    this.setState({
      items
    }, () => {
      fetch(`https://api.todoist.com/rest/v1/tasks/${props.id}/close`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        console.log('remaining active tasks:', this.state.items);
      })
    });

  }

  render() {
    return (
      <>
      {this.state.items.map(task =>
      <li className = "listOfTask" key={task.id} style={{ listStyle: 'none' }}>
        <input type="checkbox" className="pretty p-defalut p-round" onChange={() => this.handleCheckboxChange(task)} defaultChecked={task.completed} />
      {Object.prototype.hasOwnProperty.call(task, 'due') ? <span>{task.content} {task.due.date}</span> : task.content }
      </li>
      )}
      <AddTask onAddSubmit={this.handleAddTask}/>
      </>
     );
  }
}
 
export default Tasks;
