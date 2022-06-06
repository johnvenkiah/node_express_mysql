/**
 * Express web server configuration
 */

const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
    origin: 'http://localhost:8081'
};
app.use(cors(corsOptions));

// Parse requests of content-type application/json
app.use(express.json());

// Parse requests of content-type . application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: "Welcome to John's Application"});
});

require('./app/routes/tutorial.routes.js')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});