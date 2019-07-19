import React, { Component } from 'react';
import { Button, Icon, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';

const token = "93b6caac34a82a2e2d8f1d57d9f5143516e2721c";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: NaN,
      content: '',
      due_date: '',
      isAddUIOpen: false,
    }
  }

  // handleAddTask = async (event) => {

  //   let task = {
  //     content: this.state.content,
  //     due_date: this.state.due_date
  //   }

  //   if (!this.state.content) return;

  //   const request = await fetch('https://api.todoist.com/rest/v1/tasks', {
  //     method: "POST",
  //     body: JSON.stringify(task),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   const response = await request.json();

  //   const items = this.state.items.slice();
  //   items.push(response);

  //   this.state.content && this.setState({
  //     content: '',
  //     items: items,
  //   }, () => console.log('after adding new task, all tasks are:', this.state.items));
  // }

  // onEnterSave = (event) => {
  //   if (event.keyCode === 13) {
  //     this.handleAddTask();
  //   }
  // }

  handleAddChange = (event) => {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }

  handleDateSelect = (event) => {
    this.setState({due_date: event.target.value});
  }

  addTaskUI = () => {
    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.props.onAddSubmit({content: this.state.content, due_date: this.state.due_date});
        this.setState({ content: '', due_date: '' })
      }}>
        <Input className="addTaskInputBox"
          type="text" style={{ width: '200px' }}
          value={this.state.content}
          onChange={this.handleAddChange}
          onKeyDown={this.onEnterSave}
        />
        <input type="date" defaultValue="" name="schedule" onChange={this.handleDateSelect}/>
        <br/>
        <Button
          type='danger'
          style={{ backgroundColor: '#c53727', color: 'white' }}
          onClick={(event) => {
            event.preventDefault();
            this.props.onAddSubmit({content: this.state.content, due_date: this.state.due_date});
            this.setState({ content: '', due_date: '' })
          }}
        >Add task</Button>
        <Button
          type='link'
          style={{ color: '#555555', textDecoration: 'none' }}
          onClick={this.toggleUI}>Cancel</Button>
      </form>
    );
  }

  originalAddUI = () => {
    return (
      <>
        <Button type="link" className="addTaskButton" style={{ color: 'gray' }} onClick={this.toggleUI}>
          <Icon type="plus" style={{ color: 'red' }} />
          Add task
        </Button>
      </>
    );
  }

  toggleUI = () => {
    this.setState({ isAddUIOpen: !this.state.isAddUIOpen })
    return;
  }

  render() {
    return (
      this.state.isAddUIOpen ? this.addTaskUI() : this.originalAddUI()
    );
  }
}

export default AddTask;
