const express = require('express');
const { PORT } = require('./constants');
const routes = require('./routes');

const app = express();
require('./config/handlebars-config')(app);
require('./config/express-config')(app);
app.use(routes);



app.listen(PORT, () => console.log(`Server is now running at http://localhost:${PORT}/`))