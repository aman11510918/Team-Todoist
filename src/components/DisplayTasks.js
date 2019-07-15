import React, { Component } from 'react';
import '../App.css';
import { Button } from 'antd';

const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";

export default class DisplayTasks extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            items: [],
        };
    }
    componentDidMount(){
        this.getData(); 
    }

    handleDelete = async (id) => {

        let array  = [...this.state.items];
        await fetch(`https://api.todoist.com/rest/v1/tasks/${id}`,{
            method : 'DELETE',
            headers:{
                'Authorization': "Bearer "+ token,
            },
        });
        let newDeleted = array.filter(data => data.id !== id);
        this.setState({items: newDeleted})
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

    render(){
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
                <h2>Today</h2>
            { items.map((data) => (
            <p key={data.id}>{data.content}
            <Button onClick = {() => this.handleDelete(data.id)} className = "deleteBtn">DEL</Button>
            </p> 
            ))}
            </div>
            );
        }
    }
}

