import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const token = "93b6caac34a82a2e2d8f1d57d9f5143516e2721c";

class EditOnClick extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEditable: false
    }
  }

  handleEditSave = () => {
    this.setState({
      isEditable: false,
      value: this.refs.newEditedTask.value
    }, () => { 
      console.log('val in child:', this.state.value);
      const newTaskContent = {content: this.state.value};
      fetch(`https://api.todoist.com/rest/v1/tasks/${this.props.customKey}`, {
      method: "POST",
      body: JSON.stringify(newTaskContent),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      })
      .then((request) => {
        console.log('successfully updated in server')
      })

    });
  }

  onEnterSave = (event) => {
    if (event.keyCode === 13) {
      this.handleEditSave();
    }
  }

  toggleUI = () => {
    this.setState({ isEditable: !this.state.isEditable })
  }

  editViewUI = () => {
    return (
      <div>
        <input className='' type='text' defaultValue={this.state.value} ref='newEditedTask' onKeyDown={this.onEnterSave} />
        <br />
        <Button className='' onClick={this.handleEditSave}>Save</Button>
        <Button className='' onClick={this.toggleUI}>Cancel</Button>
      </div>
    );
  }

  originalViewUI = () => {
    return (
      <span onClick={this.toggleUI}>
        {this.state.value}
      </span>
    );
  }

  render() {
    return (
      this.state.isEditable ? this.editViewUI() : this.originalViewUI()
    );
  }
}

export default EditOnClick;