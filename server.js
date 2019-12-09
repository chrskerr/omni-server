const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // required for Express for JSON POST / PUT requests

global.Url = require('./api/models/Model.js');
const routes = require('./api/routes/Routes.js');

const port = process.env.PORT || 3125; // if the environment is dictating port use theirs, if not use 3125
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

routes(server);
server.listen(port);

server.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" })
})

console.log(`Server is running at http://localhost:${ port }`);