import React, { Component } from 'react';
import DisplayTasks from './DisplayTasks';
import 'antd/dist/antd.css';
import '../App.css';
import { Layout, Menu, Icon } from 'antd';
import logo from '../logo/Todolist-home.jpg';
import { Input }from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

export default class HomePage extends Component {
    render() { 
        return (
            <>
             <Layout>
    <Header className="header" style = {{background : '#db4c3f', height : '44px'}}> 
      <img src={logo} alt="Todoist Logo" className="logo"/>

      <Search
      className = 'searchbar'
      placeholder="Quick Find"
      onSearch={value => console.log(value)}
    />
      <Menu
        mode="horizontal"
       
        style={{ lineHeight: '45px', background : '#db4c3f', float: 'right'}}>

        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
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
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="inbox" />
                  Inbox
                </span>
              }
            >
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="calendar" />
                  Today
                </span>
              }
            >
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="calendar" />
                  subnav 3
                </span>
              }
            >
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <DisplayTasks /> </Content>
      </Layout>
    </Content>
  </Layout>
  </Layout>

            </>
        );
    }
}