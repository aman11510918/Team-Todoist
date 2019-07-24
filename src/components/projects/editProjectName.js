import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
const Cookies = require('js-cookie')

// const token = Cookies.get('theToken')
const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";
class EditOnDoubleClick extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEditable: false,
      editableProjectID: props.customKey
    }
  }

  handleEditSave = () => {
    this.setState({
      isEditable: false,
      value: this.refs.newEditedProject.value
    }, () => {
      const newProjectContent = { content: this.state.value };
      fetch(`https://api.todoist.com/rest/v1/projects/${this.state.customKey}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      console.log('successfully deleted project with id:', this.state.customKey)
    })
    });
  }

  toggleUI = () => {
    this.setState({ isEditable: !this.state.isEditable })
  }

  editViewUI = () => {
    return (
      <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center' }}>
        <input className='' type="text" style={{ width: '350px', height: '32px', borderRadius: '5px', border: '2px solid #ccc', padding: '4px 11px', margin: '7px' }} defaultValue={this.state.value} ref='newEditedProject' />
        <></>
        <Button type='danger' style={{ backgroundColor: '#c53727', color: 'white', borderRadius: '5px', marginLeft: '7px' }} className='' onClick={() => { this.handleEditSave(); this.toggleUI(); this.props.onEditClick({ isEditable: !this.state.isEditable }) }}>Save</Button>
        <Button type="link" className='' style={{ color: '#555555', textDecoration: 'none' }} onClick={() => { this.toggleUI(); this.props.onEditClick({ isEditable: !this.state.isEditable }) }}>Cancel</Button>
      </div>
    );
  }

  originalViewUI = () => {
    return (
      <Link onDoubleClick={() => { this.toggleUI(); this.props.onEditClick({ isEditable: !this.state.isEditable, editableProjectID: this.state.editableProjectID }) }}>
        {this.state.value}
      </Link>
    );
  }

  render() {
    return (
      this.state.isEditable ? this.editViewUI() : this.originalViewUI()
    );
  }
}

export default EditOnDoubleClick;
