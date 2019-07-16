import React, { Component } from 'react';
import DisplayTasks from './DisplayTasks';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon,Collapse, Button } from 'antd';
import '../App.css';
import logo from '../logo/Todolist-home.jpg';

const { Panel } = Collapse;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const genExtra = () => (
  <Icon
    type="plus"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);


export default class HomePage extends Component {
    render() { 
        return (
            <>
             <Layout>
    <Header className="header" style = {{background : '#db4c3f', height : '44px'}}> 
      <img src={logo} alt="Todoist Logo" className="logo"/>

      <form>
        <input className = "searchbox" type="text" name="search" placeholder="Quick Find" />
      </form>

      <Menu
        mode="horizontal"
       
        style={{ lineHeight: '45px', background : '#db4c3f', float: 'right'}}>

        <Menu.Item key="1" ><Icon type="plus" style={{color: 'white' }}/></Menu.Item>
        <Menu.Item key="2" ><Icon type="notification" theme="filled" style={{color: 'white' }}/></Menu.Item>
        <Menu.Item key="3" ><Icon type="setting" theme="filled" style={{color: 'white' }}/></Menu.Item>
      </Menu>
    </Header>
    <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <Menu.Item key="1">
            <Icon type="inbox" />
            Inbox
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="calendar" />
            Today
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="calendar" />
            Next 7 Days
          </Menu.Item>

          <Menu.Item key="4">
          <Collapse
                    expandIconPosition={'left'}
                  >
                    <Panel header="Project" extra={genExtra()}>
                      <div><Button type="link"><Icon type="plus" />Add Project</Button></div>
                    </Panel>
                    
                    
                  </Collapse>

          </Menu.Item>

          <Menu.Item key="5">
          <Collapse
                    expandIconPosition={'left'}
                  >
                <Panel header="Label" extra={genExtra()}>
                      <div><Button type="link"><Icon type="plus" />Add Label</Button></div>
                    </Panel>
                </Collapse>

          </Menu.Item>
          <Menu.Item key="6">
          <Collapse
                    expandIconPosition={'left'}
                  >
                <Panel header="Filter" extra={genExtra()}>
                      <div>Filter according to priority.</div>
                    </Panel>
                </Collapse>

          </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <DisplayTasks /> 
        </Content>
      </Layout>
    </Content>
  </Layout>
  </Layout>

            </>
        );
    }
}