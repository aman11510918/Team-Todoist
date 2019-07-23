const express = require('express');
const app = express();
const redirectTo = require('./routes/redirectTo');
const port = process.env.PORT || 4000

app.use(express.json());

app.use(express.static('build'))

app.use('/auth', redirectTo);

app.listen(port, () => console.log(`Listening on ${port}`));
