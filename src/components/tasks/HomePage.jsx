import React, { Component } from 'react';
import AddTask from '../components/tasks/main'
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import '../App.css';
import logo from '../logo/Todolist-home.jpg';
const { Header, Content, Sider } = Layout;

export default class HomePage extends Component {
  render() {
    return (
      <>
        <Layout>
          <Header className="header" style={{ background: '#db4c3f', height: '44px' }}>
            <img src={logo} alt="Todoist Logo" className="logo" />
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
                  </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  {/* <DisplayTasks /> */}
                  < AddTask />
                </Content>
              </Layout>
            </Content>
          </Layout>
        </Layout>

      </>
    );
  }
}