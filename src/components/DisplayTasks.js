import React, { Component } from 'react';
import '../App.css';

const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";

export default class DisplayTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      isLoaded: false,
      items: [],
      content: '',
      completed: false
    };
  }
  componentDidMount() {
    this.getData();
  }

  handleDelete = async (id) => {

    let array = [...this.state.items];
    await fetch(`https://api.todoist.com/rest/v1/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': "Bearer " + token,
      },
    });
    let newDeleted = array.filter(data => data.id !== id);
    this.setState({ items: newDeleted })
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

  onAddChange = (event) => {
    this.setState({ content: event.target.value });
  }

  handleAdd = async (event) => {

    event.preventDefault();

    let task = {
      content: this.state.content
    }

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

    this.state.content && this.setState({
      content: '',
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


  addTaskUI = () => {
    return (
      <form className="TaskList" onSubmit={this.handleAdd}>
        <input className="addTaskInputBox" value={this.state.content} onChange={this.onAddChange} />
        <button className="addTaskButton" >Add task</button>
      </form>
    );
  }

  render() {
    console.log('inside render');
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div>
          {this.addTaskUI()}
          {items.map((data) => (
            <li key={data.id} style={{ listStyle: 'none' }}>
              <input type="checkbox" onChange={() => this.handleCheckboxChange(data)} defaultChecked={data.completed} />
              {data.content}
              <button onClick={() => this.handleDelete(data.id)}>DEL</button>
            </li>
          ))}
        </div>
      );
    }
  }
}
