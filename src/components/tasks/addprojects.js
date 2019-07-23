import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: NaN,
      content: '',
      isAddUIOpen: false,
    }
  }

  handleAddChange = (event) => {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }


  addProjectUI = () => {
    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.props.onAddSubmit({ content: this.state.content});
        this.setState({ content: ''}, () => {this.toggleUI()})
      }}>
        <input className="addTaskInputBox"
          type="text"
          style={{ width: '260px', height: '32px', borderRadius: '5px', border: '2px solid #ccc', padding: '4px 11px', margin: '7px' }}
          value={this.state.content}
          onChange={this.handleAddChange}
          onKeyDown={this.onEnterSave}
        /><br />
        <Button
          type='danger'
          style={{ backgroundColor: '#c53727', color: 'white', borderRadius: '5px', marginLeft: '7px' }}
          onClick={(event) => {
            event.preventDefault();
            this.props.onAddSubmit({ content: this.state.content });
            this.setState({ content: ''}, () => {this.toggleUI()});
          }}
        >Add project</Button>
        <Button
          type='link'
          style={{ color: '#555555', textDecoration: 'none' }}
          onClick={this.toggleUI}>Cancel</Button>
      </form>
    );
  }

  originalProjectUI = () => {
    return (
      <div style={{minHeight: '120px', display: 'flex', alignItems: 'start'}}>
        <Button type="link" className="addTaskButton" style={{ color: 'gray' }} onClick={this.toggleUI}>
          <Icon type="plus" style={{ color: 'red' }} />
          Add Project
        </Button>
      </div>
    );
  }

  toggleUI = () => {
    this.setState({ isAddUIOpen: !this.state.isAddUIOpen, content: ''})
    return;
  }

  render() {
    return (
      this.state.isAddUIOpen ? this.addProjectUI() : this.originalProjectUI()
    );
  }
}

export default AddProject;
