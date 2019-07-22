import React, { Component } from 'react';
import AddTask from './add'
import EditOnClick from './edit'
import { Popover, Modal, Button, Icon, Radio } from 'antd';
import moment from 'moment'

const { confirm } = Modal;

 const token = '1af2e951c667fdb4790f2a868eb63644ab95421c';
 
 class ProjectDetail extends Component {
     constructor(props) {
         super(props);
         this.state = {
            isLoaded:'false',
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
            'Authorization': "Bearer " + token,
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
    
        this.setState({
          items
        }, () => {
          fetch(`https://api.todoist.com/rest/v1/tasks/${props.id}/close`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        });
    
      }
    
      currDate = () => {
        var tempDate = new Date();
        var month = new Date().getMonth() + 1;
        return (tempDate.getFullYear() + '-' + (month < 10 ? '0' + month : '' + month) + '-' + tempDate.getDate());
      }
    
      /**
       * @return if item has a due date or not
       */
      handleDueDate = (item) => {
        return (
          Object.prototype.hasOwnProperty.call(item, 'due') ? Date.parse(item.due.date) : ""
        );
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

     render() { 
         const id = this.props.match.params.id;
         const projectTask = this.state.items.filter(val => val.project_id ===  Number(id))
         return (  
             <>
             { projectTask.map(task =>  <div className = 'displayList' key={task.id}>
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
            <div className='due' style={{fontSize: '10px'}} >
              {!(task.id === this.state.editableTaskID) && Object.prototype.hasOwnProperty.call(task, 'due') ? this.handleDates(task.due.date) : ''}
            </div>
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
  
 export default ProjectDetail;