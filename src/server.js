const express = require('express');
const { PORT } = require('./constants');

const app = express();
require('./config/express-config')(app);

app.get('/', (req, res) => {
    res.send('Its working');
});

app.listen(PORT, () => console.log(`Server is now running at http://localhost:${PORT}/`))