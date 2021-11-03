const express = require('express');
const { initDatabase } = require('./config/database-config');
const { PORT } = require('./constants');
const routes = require('./routes');

const app = express();
require('./config/handlebars-config')(app);
require('./config/express-config')(app);
app.use(routes);


initDatabase()
    .then(() => {
        console.log('Database is running now.');
        app.listen(PORT, () => console.log(`Server is now running at http://localhost:${PORT}/`))
    })
    .catch(err => {
        console.log("Cannot connect database", err);
    });