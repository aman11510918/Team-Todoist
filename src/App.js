import React, { Component } from 'react';

const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";

export default class App extends Component {
      constructor(props)
      {
        super(props);
        this.state = {
          error: undefined,
          isLoaded: false,
          items: [],
        };
        //this.getData = this.getData.bind(this);
      }
      componentDidMount()
      {
        this.getData();
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
          const result = await res.json();
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

      render()
      {
        const { error, isLoaded, items } = this.state;
        
      if (error) {
          return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
          return <div>Loading...</div>;
        }
        else {
          return (
            <React.Fragment>
            { items.map(data => ( <p key={data.id}>{data.content}</p> )) }
            </React.Fragment>
          );
        }
      }
    }

