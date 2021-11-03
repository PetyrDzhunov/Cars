const express = require('express');
const { PORT } = require('./constants');

const app = express();

app.get('/', (req, res) => {
    res.send('Its working');
});

app.listen(PORT, () => console.log(`Server is now running at http://localhost/${PORT}`))