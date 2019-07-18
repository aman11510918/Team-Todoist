import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

class EditOnClick extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'hey there',
      isEditable: false
    }
  }

  handleEditSave = (event) => {
    this.setState({
      isEditable: false,
      value: this.refs.newEditedTask.value
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