import React, { Component } from 'react';
import { Button, Icon, DatePicker } from 'antd';
import 'antd/dist/antd.css';
// import moment from 'moment';

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

  handleAddChange = (event) => {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }

  handleDateSelect = (event) => {
    this.setState({ due_date: event.target.value });
  }

  handleSelect = (event) => {
    this.setState({due_date: event._d})
    // console.log(this.state.due_date);
  }

  addTaskUI = () => {
    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.props.onAddSubmit({ content: this.state.content, due_date: this.state.due_date });
        this.setState({ content: '', due_date: '' })
      }}>
        <input className="addTaskInputBox"
          type="text"
          style={{ width: '440px', height: '32px', borderRadius: '5px', border: '2px solid #ccc', padding: '4px 11px', margin: '7px' }}
          value={this.state.content}
          onChange={this.handleAddChange}
          onKeyDown={this.onEnterSave}
        />
        <DatePicker
          suffixIcon={<Icon type='none' />}
          format='D MMM'
          style={{ width: '100px' }}
          onChange={this.handleSelect}
          // defaultValue={moment(new Date().toISOString().split('T')[0], 'YYYY-MM-DD')}
          placeholder='schedule'
        />
        <br />
        <Button
          type='danger'
          style={{ backgroundColor: '#c53727', color: 'white', borderRadius: '5px', marginLeft: '7px' }}
          onClick={(event) => {
            event.preventDefault();
            this.props.onAddSubmit({ content: this.state.content, due_date: this.state.due_date || new Date() });
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
      <div style={{minHeight: '100px', display: 'flex', alignItems: 'center'}}>
        <Button type="link" className="addTaskButton" style={{ color: 'gray' }} onClick={this.toggleUI}>
          <Icon type="plus" style={{ color: 'red' }} />
          Add task
        </Button>
      </div>
    );
  }

  toggleUI = () => {
    this.setState({ isAddUIOpen: !this.state.isAddUIOpen, content: '', due_date: '' })
    return;
  }

  render() {
    return (
      this.state.isAddUIOpen ? this.addTaskUI() : this.originalAddUI()
    );
  }
}

export default AddTask;
