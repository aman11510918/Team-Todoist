import React, { Component } from 'react';
import DisplayTasks from './DisplayTasks';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import '../App.css';
import { Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout;

export default class HomePage extends Component {
    render() { 
        return (
            <>
             <Layout>
    <Header className="header" style = {{background : '#db4c3f', height : '44px'}}> 
      {/* <img src={logo} alt="Todoist Logo" className="logo"/> */}

      {/* <form>
        <input className = "searchbox" type="text" name="search" placeholder="Quick Find" />
      </form> */}

      {/* <Menu
        mode="horizontal"
       
        style={{ lineHeight: '45px', background : '#db4c3f', float: 'right'}}>

        <Menu.Item key="1" ><Icon type="plus" style={{color: 'white' }}/></Menu.Item>
        <Menu.Item key="2" ><Icon type="notification" theme="filled" style={{color: 'white' }}/></Menu.Item>
        <Menu.Item key="3" ><Icon type="setting" theme="filled" style={{color: 'white' }}/></Menu.Item>
      </Menu> */}
    </Header>
    <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
              
            <Menu.Item key="1">
              <Link to="/Inbox">
            <Icon type="inbox" />
            Inbox
            </Link>
          </Menu.Item>

          
          <Menu.Item key="2">
              <Link to="/today">
            <Icon type="calendar" />
            Today
              </Link>
          </Menu.Item>
        

         
          <Menu.Item key="3">
          <Link to="nextdays">
            <Icon type="calendar" />
            Next 7 Days
            </Link>
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