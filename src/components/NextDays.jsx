import React, {useState, useEffect } from 'react';

const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";

function Today()
{
    useEffect(() => {

        fetchItems();

    },[])

    const [items, setItems] = useState([]);
 
    const fetchItems = async () => {
        let data = await fetch(`https://api.todoist.com/rest/v1/tasks`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                },
            })
            const items = await data.json();
            // console.log(items);
            setItems(items);
    }
    const currDate = () => {
        var tempDate = new Date();
        var month = new Date().getMonth()+1;
        var date = tempDate.getFullYear() + '-' + (month < 10 ? '0' + month : '' + month) + '-' + tempDate.getDate();
        return date;
    }

    const filteredItems = items.filter(val => (Date.parse(val.due.date))-(Date.parse(currDate())) > 7);
    return (
        <div>
              <h1> {filteredItems.map(val => <h2 key = {val.id}>{val.content}</h2>)} </h1>
        </div>
    );
}
 
export default Today;