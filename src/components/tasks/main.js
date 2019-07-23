import React, { Component } from 'react';
import AddTask from './add'
import EditOnClick from './edit'
import moment from 'moment'
import { Popover, Modal, Button, Icon, Radio, Tooltip } from 'antd';

const { confirm } = Modal;

const token = "93b6caac34a82a2e2d8f1d57d9f5143516e2721c";
// const token = '6353a697208d207658daa816471b1da86cbc2c96';
// const token = '1af2e951c667fdb4790f2a868eb63644ab95421c';

class Tasks extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      key: '',
      isEditable: false,
      editableTaskID: ''
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
          Authorization: `Bearer ${token}`,
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

  handleDelete = async (id) => {

    let array = [...this.state.items];
    await fetch(`https://api.todoist.com/rest/v1/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let newDeleted = array.filter(data => data.id !== id);
    this.setState({ items: newDeleted })
  }

  showDeleteConfirm = (data) => {
    confirm({
      title: 'Are you sure, you want to delete ?',
      content: `${data.content}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.handleDelete(data.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleAddTask = async (newData) => {

    let task = {
      content: newData.content,
      due_date: new Date(newData.due_date).toISOString().split('T')[0]
    }

    if (!newData.content) return;
    if (!moment(newData.due_date).isValid()) return;

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

  handleDates = (dateString) => {
    let date = moment(dateString);
    if (moment().diff(date, 'days') >= 1) {
      return date.fromNow();
    }
    else {
      return date.calendar().split(' ')[0];
    }
  }

  handleEditToggle = (props) => {
    console.log(props);
    this.setState({isEditable: props.isEditable, editableTaskID: props.editableTaskID}, () => {console.log('editable status:', this.state.isEditable, 'with id:', this.state.editableTaskID)})
  }

  render() {
    return (
      <>
        {this.state.items.map(task =>
        <div className = 'displayList'>
          <li className="listOfTask" key={task.id}
            style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}>
            <div>
              { !(task.id === this.state.editableTaskID) && <Radio size='large'
                onChange={() => this.handleCheckboxChange(task)}
                defaultChecked={task.completed}
                style={{marginRight: '10px'}}
              />}
              <EditOnClick customKey={task.id} value={task.content} onEditClick={this.handleEditToggle}/>
            </div>
            {/* <Tooltip placement='bottom' title={somecallback}> */}
            <div className='due' style={{fontSize: '10px'}} >
              {!(task.id === this.state.editableTaskID) && Object.prototype.hasOwnProperty.call(task, 'due') ? this.handleDates(task.due.date) : ''}
            </div>
            {/* </Tooltip> */}
            </li>
            <div style={{ clear: 'both', whiteSpace: 'wrap' }}>
              <Popover
                width='120'
                placement="bottomRight"
                trigger="focus"
                content={
                  <div>
                    <Button type='link' style={{ color: '#333333' }} onClick={() => this.showDeleteConfirm(task)}><Icon type='delete' style={{ color: 'gray' }} />Delete Task</Button>
                    <br />
                    {/* <Button type="link" style={{ color: '#333333' }}><Icon type='edit' style={{ color: 'gray' }} />Edit Task</Button> */}
                  </div>
                }
              >
                <Button type='link' style={{ color: 'black' }}>. . .</Button>
              </Popover>
            </div>
          </div>
        )}
        <AddTask onAddSubmit={this.handleAddTask} />
      </>
    );
  }
}

export default Tasks;
