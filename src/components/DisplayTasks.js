import React, { Component } from 'react';
import 'pretty-checkbox'
import '../App.css';
import { Menu, Icon } from 'antd';
import { Button, Modal, Form, Input, Popover} from 'antd';

const { confirm } = Modal;

const { SubMenu } = Menu;

const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";

/*---------------for edit form----------------*/

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Edit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Write Your Changes Here">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
/*------------------------------------------- */

export default class DisplayTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      isLoaded: false,
      items: [],
      content: '',
      completed: false,
      editContent: '',
      visible: false,
      editableTaskID: NaN
    };
  }
  componentDidMount() {
    this.getData();
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
      onOk: ()  => {
          this.handleDelete(data.id);         
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  getData = async () => {
    try {
      const res = await fetch(`https://api.todoist.com/rest/v1/tasks`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
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

  onAddChange = (event) => {
    this.setState({ content: event.target.value });
  }

  handleAdd = async (event) => {

    event.preventDefault();

    let task = {
      content: this.state.content
    }

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

    this.state.content && this.setState({
      content: '',
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

  addTaskUI = () => {
    return (
      <form className="TaskList" onSubmit={this.handleAdd}>
        <input className="addTaskInputBox" value={this.state.content} onChange={this.onAddChange} />
        <Button type="link" className="addTaskButton" style={{color: 'gray'}} onClick ={this.handleAdd}>
        <Icon type="plus" style={{color:'red'}}/>
        Add task
        </Button>
      </form>
    );
  }

  /*---------------------edit---------------*/
  
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };



  onEditClick = (task) => {
    this.setState({editContent: task.content, editableTaskID: task.id}, () => console.log('set in state:', this.state.editContent));
  }

  onEditSubmit = (data) => {
    console.log('edited content:', this.state.editContent);
    const taskID = this.state.editableTaskID;
    let allItems = this.state.items.slice();
    allItems.filter(task => task.id === taskID)[0].content = this.state.editContent;
    this.setState({item: allItems});

    const currentItem = this.state.items.filter(task => task.id === taskID)[0];
    console.log(currentItem);

    fetch(`https://api.todoist.com/rest/v1/tasks/${currentItem.id}`, {
      method: 'POST',
      body: JSON.stringify({ content: currentItem.content }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }

  onEditChange = (event) => {
    console.log('changed content:', event.target.value);
    this.setState({ editContent: event.target.value});
  }

  editTaskUI = () => {
    return(
      <form onSubmit={(event) => { event.preventDefault(); this.onEditSubmit(this.state.items); this.setState({editContent: ''}) }}>
        <label>
          Edit Content:
          <input type="text" value={this.state.editContent} onChange={this.onEditChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
  /*---------------------------------------------------*/

  render() {
    // console.log('inside render');
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div>
          {this.editTaskUI()}
          {items.map((data) => (
            <li className = "listOfTask" key={data.id} style={{ listStyle: 'none' }}>
                <div>
              <input type="checkbox" className="pretty p-defalut p-round" onChange={() => this.handleCheckboxChange(data)} defaultChecked={data.completed} />

              {data.content}
              </div>

               
                <div>
              <Menu >
                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            . . .
                        </span>
                        }>
                    <Menu.Item className = 'ant-menu-submenu-arrow' key="setting:1">
                        <Button type="link" style={{color: 'red'}} onClick={() => this.showDeleteConfirm(data)}>
                        <Icon type="delete" theme="filled"/>
                        Delete Task
                        </Button>
                    </Menu.Item>
                    <Menu.Item key="setting:2"><Button type = 'link' onClick={() => this.onEditClick(data)} >Edit Task</Button></Menu.Item>
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                 </SubMenu>
                </Menu>
                </div>
            </li>
            
          ))}
          {this.addTaskUI()}
        </div>
      );
    }
  }
}
