const express = require('express');
const app = express();
const expressRoute = require('./src/components/routes/expressRoutes');

const port = process.env.PORT || 4000

console.log(process.env.TEST, 'testing')

app.use(express.json());

app.use(express.static('build'))

app.use('/auth', expressRoute);

app.listen(port, () => console.log(`Listening on ${port}`));
