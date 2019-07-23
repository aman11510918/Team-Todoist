import React, { Component } from 'react';
import AddTask from './add'
import EditOnClick from './edit'
import moment from 'moment'
import { Popover, Modal, Button, Icon, Radio, Tooltip } from 'antd';

const { confirm } = Modal;

// const token = "93b6caac34a82a2e2d8f1d57d9f5143516e2721c";
// const token = '6353a697208d207658daa816471b1da86cbc2c96';
const token = '1af2e951c667fdb4790f2a868eb63644ab95421c';

class Tasks extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded:'false',
      items: [],
      key: '',
      isEditable: false,
      editableTaskID: '',
      completedTasks: [],
      showCompleted: false,
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
    });
  }

  handleCheckboxChange = (props) => {

    const items = this.state.items.filter(item => item.id !== props.id);

    const completedItem = this.state.items.filter(item => item.id === props.id)[0];
    const completedTasks = this.state.completedTasks.slice();
    completedTasks.push(completedItem);

    this.setState({
      items: items, completedTasks: completedTasks
    }, () => {
      fetch(`https://api.todoist.com/rest/v1/tasks/${props.id}/close`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
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
    this.setState({isEditable: props.isEditable, editableTaskID: props.editableTaskID})
  }

  handleCompleteTask = () => {
   
    this.setState({showCompleted: !this.state.showCompleted});
  }
  
  showCompletedTasks = () => {
    return (
      this.state.completedTasks.map(completedTask => {
          return <div style={{marginRight:'50px'}}>
              <li style={{listStyle: 'none', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e8e8e8', paddingTop: '10px', paddingBottom: '10px'}}>
             <Icon type="check-circle" theme="filled" style={{color:'green'}}/>
                  <span style={{marginLeft: '10px'}}>{completedTask.content}</span>
              </li>



          </div>
        })
    )
  }

  render() {
    return (
      <>
      
      <h1>
        Inbox
        <Button type="link" onClick={() => this.handleCompleteTask()}><Icon type="check-circle" />Show Completed Task</Button>
      </h1>

        {this.state.items.map(task =>
        <div className = 'displayList' key={task.id}>
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
            <Tooltip placement='bottom' title={'Date'}>
            <div className='due' style={{fontSize: '10px'}} >
              {!(task.id === this.state.editableTaskID) && Object.prototype.hasOwnProperty.call(task, 'due') ? this.handleDates(task.due.date) : ''}
            </div>
            </Tooltip>
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
        {this.state.showCompleted ? this.showCompletedTasks() : null }
                
      </>
    );
  }
}

export default Tasks;
