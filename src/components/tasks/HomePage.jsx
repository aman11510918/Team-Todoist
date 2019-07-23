import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'antd/dist/antd.css';

import '../../App.css'
import logo from '../../logo/Todolist-home.jpg';
import RoutesFilter from '../RoutesFilter.jsx'
import { Collapse, Layout, Menu, Icon, Button } from 'antd';

const Cookies = require('js-cookie');


const { Header, Content } = Layout;
const { Panel } = Collapse;

export default class HomePage extends Component {

  doLogout=(e)=>{
    let token = Cookies.get('theToken');
    Cookies.remove('theToken');
    console.log('Logged out(react)'); 
    console.log('cookie is:', Cookies.get('theToken'));
    window.location =`/auth/logout?access_token=${token}`;
    
  }

  genExtra = () => (
    <Icon type="plus"
      onClick={event => {
        event.stopPropagation();
      }}
    />
  );

  render() {
    return (
      <Router>
          <div>
            <Layout>
              <Header className="header" style={{ width: '100%', background: '#db4c3f', height: '44px', position: 'fixed' }}>
                <Link to="/"><img src={logo} alt="Todoist Logo" className="logo" /></Link>
                <Button className="log-out-button" onClick={this.doLogout} > <a>LOG OUT</a></Button>
              </Header>
              <Content style={{ padding: '0 0 0 15px', height: '47.5em', background: '#fafafa' }}>
                <div style={{ width: '299px', margin: '90px 0px 0px 124px', height: '47.5em', position: 'fixed' }}>
                  <Menu
                    mode="inline"
                    style={{ height: '100%', background: '#fafafa' }}>

                    <Menu.Item key="1" >
                      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon type="inbox" style={{ fontSize: '25px', color: 'black' }} />
                        <span style={{ fontSize: '15px', color: '#333333' }}>Inbox</span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                      <Link to="/today" style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon type="calendar" style={{ fontSize: '22px', color: 'black' }} />
                        <span style={{ fontSize: '15px', color: '#333333' }}>Today</span>
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                      <Link to="/nextdays" style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon type="schedule" style={{ fontSize: '22px', color: 'black' }} />
                        <span style={{ fontSize: '15px', color: '#333333' }}>Next 7 Days</span>
                      </Link>
                    </Menu.Item>

                    <Collapse bordered={false} style={{ backgroundColor: '#fafafa' }}>
                      <Panel header="Projects" key="1" extra={this.genExtra()}>
                        {
                          <p style={{ paddingLeft: 24 }}>
                            sample projct panel
                        </p>
                        }
                      </Panel>
                    </Collapse>

                  </Menu>
                </div>

                <Content
                  style={{
                    margin: '45px 170px 0 422px',
                    positin: 'relative',
                    height: '47.5em',
                    background: 'white',
                    borderRight: '1px solid #e8e8e8',
                    borderLeft: '1px solid #e8e8e8'
                  }}>
                  <div style={{ padding: '45px 0px 0px 45px' }}>
                    <RoutesFilter />
                  </div>
                </Content>
              </Content>
            </Layout>
          </div>
        </Router>
    ) 
  }
}