const express = require('express');
const app = express();
const redirectTo = require('./routes/redirectTo');

app.use(express.json());

app.use('/auth', redirectTo);

app.listen(4000, () => console.log('Listening on 4000...'));
    