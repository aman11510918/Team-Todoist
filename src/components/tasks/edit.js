import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

const token = "93b6caac34a82a2e2d8f1d57d9f5143516e2721c";

class EditOnClick extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEditable: false,
      editableTaskID: props.customKey
    }
  }

  handleEditSave = () => {
    // console.log('edited value:', this.refs.newEditedTask.value)
    this.setState({
      isEditable: false,
      value: this.refs.newEditedTask.value
    }, () => {
      // console.log('val in child:', this.state.value);
      const newTaskContent = { content: this.state.value };
      fetch(`https://api.todoist.com/rest/v1/tasks/${this.props.customKey}`, {
        method: "POST",
        body: JSON.stringify(newTaskContent),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((request) => {
          // console.log('successfully updated in server')
        })
    });
  }
  
  toggleUI = () => {
    this.setState({ isEditable: !this.state.isEditable })
  }

  editViewUI = () => {
    return (
      <div style={{minHeight: '100px', display: 'flex', alignItems: 'center'}}>
        <input className='' type="text" style={{ width: '350px', height: '32px', borderRadius: '5px', border: '2px solid #ccc', padding: '4px 11px', margin: '7px' }} defaultValue={this.state.value} ref='newEditedTask' />
        <></>
        <Button type='danger' style={{ backgroundColor: '#c53727', color: 'white', borderRadius: '5px', marginLeft: '7px' }} className='' onClick={() => { this.handleEditSave(); this.toggleUI(); this.props.onEditClick({isEditable: !this.state.isEditable})} }>Save</Button>
        <Button type="link" className='' style={{ color: '#555555', textDecoration: 'none' }} onClick={ () => { this.toggleUI(); this.props.onEditClick({isEditable: !this.state.isEditable}) } }>Cancel</Button>
      </div>
    );
  }

  originalViewUI = () => {
    return (
      <span onClick={() => { this.toggleUI(); this.props.onEditClick({isEditable: !this.state.isEditable, editableTaskID: this.state.editableTaskID}) }}>
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
