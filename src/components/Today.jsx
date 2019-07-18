import React, {useState, useEffect } from 'react';

const token = "78fcfd26adb47157e35612abb3649bdf71cc1400";

function Today()
{
    useEffect(() => {

        fetchItems();

    },[])

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(`https://api.todoist.com/rest/v1/tasks`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                },
            })
            const items = await data.json();
            console.log(items);
            setItems(items);
}
    return (
        <div>
            {items.map(item => (
                <h1>{item.content}</h1>
            ))}
        </div>
    );
}
 
export default Today;