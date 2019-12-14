const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
    `mongodb://127.0.0.1:27017/`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

global.Propositions = require('./api/models/referendumModel.js')

// global.Url = require('./api/models/Model.js');
const routes = require('./api/routes/Routes.js');
const referendum = require('./api/graphql/referedum.js')

const port = process.env.PORT || 3125;
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

referendum(server);
routes(server);
server.listen(port);

server.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" })
})

console.log(`Graphql is running at http://localhost:${ port }/referendums/graphql`);
