const express = require('express');
const app = express();
require('dotenv').config();

const router = express.Router();
const fetch = require('node-fetch');
var theCode = '';
var theToken = '';
const Cookies = require('js-cookie');

require('dotenv').config();

router.get('/todoist', (req, res) => {
    const csrfState = Math.random().toString(36).substring(7);
    res.cookie('csrfState', csrfState, { maxAge: 60000 });
    const query = {
        scope: 'read:user',
        client_id:  process.env.CLIENT_ID,
        state: csrfState,
    };
    res.redirect(`https://todoist.com/oauth/authorize?client_id=${query.client_id}&scope=task:add,data:read_write,data:read,data:delete&state=${csrfState}`);
});

router.get('/todoist/redirect', (req, res) => { 
    theCode = req.query.code;
    console.log('the code: ' + theCode);
    if (req.query.error){
        res.redirect('/')
    }
    const query = {
        client_id:  process.env.CLIENT_ID,
        client_secret:  process.env.CLIENT_SECRET,
        code: theCode,
        redirect_uri: '/'
    };

    let url = `https://todoist.com/oauth/access_token?client_id=${query.client_id}&client_secret=${query.client_secret}&code=${query.code}&redirect_uri=${query.redirect_uri}`;
    fetch(url, {
        method:'POST'
    }).then(data => {
        let d = data.json();
        console.log(d);
        return d;
    })
    .then(data =>  data.access_token)
    .then(data => {
        theToken = data;
        res.cookie('theToken', theToken);
        console.log('the token: ' + theToken);
    })
    .then(() => res.redirect('/'))    
});

router.get('/logout', (req, res) => {
    console.log(req.query);
    
    const query = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        access_token: req.query.access_token
    };
            
    console.log(query);
    let url = `https://api.todoist.com/sync/v8/access_tokens/revoke`;

    fetch(url, {
        method:'POST',
        body: JSON.stringify(query),   
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( () => {
        res.redirect('/');
    })
});

module.exports = router;    