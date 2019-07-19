import React, { Component } from 'react';
import AddTask from './add'
import EditOnClick from './edit'
import { Modal, Button, Icon } from 'antd';
import  moment from "moment";
const { confirm } = Modal;

// const aman = "78fcfd26adb47157e35612abb3649bdf71cc1400";
const ram = '93b6caac34a82a2e2d8f1d57d9f5143516e2721c';

class TodayTasks extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      key: '',
      isAdded: false,
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
          'Authorization': "Bearer " + ram,
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
        'Authorization': "Bearer " + ram,
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
      onOk: ()  => {
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

    const request = await fetch('https://api.todoist.com/rest/v1/tasks', {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ram}`
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
          Authorization: `Bearer ${ram}`
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

    handleDueDate = (item) => {
    return (
        Object.prototype.hasOwnProperty.call(item, 'due') ? item.due.date : ""
    );
}

  render() {
    const tasksWithDueDatesLessThanSevenDays = 
    this.state.items.filter(value => {
      const foramattedDate = Math.abs((moment().diff(this.handleDueDate(value), 'days')));
      return (foramattedDate < 7  && foramattedDate >= 0 );
    });
    return (
      <>
      {tasksWithDueDatesLessThanSevenDays.map(task =>
      <li className="listOfTask" key={task.id}
      style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}>
        <div>
          <input type="checkbox" className="checkbox"
            onChange={() => this.handleCheckboxChange(task)}
            defaultChecked={task.completed}
          />
          <EditOnClick customKey={task.id} value={task.content} />
        </div>
        <div className='due' style={{ float: 'right' }}>{Object.prototype.hasOwnProperty.call(task, 'due') ? this.handleDates(task.due.date) : ''}
          <Button type="link" style={{ color: 'red' }} onClick={() => this.showDeleteConfirm(task)}>
            <Icon type="delete" theme="filled" />
            Delete Task
    </Button>
        </div>
      </li>
    )}
      <AddTask onAddSubmit={this.handleAddTask} />
      </>
     );
  }
}
 
export default TodayTasks;