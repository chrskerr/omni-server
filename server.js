const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb://127.0.0.1:27017/`,
    { 
        useFindAndModify: true,
        useCreateIndex: true,
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

const whitelist = [/localhost/, /chrskerr\.com/];
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    whitelist.forEach( e => {
        if (req.header('Origin').match(e) !== -1) {
          corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
        } else {
        corsOptions = { origin: false } // disable CORS for this request
        }
    })
    callback(null, corsOptions) // callback expects two parameters: error and options
};

server.use(cors(corsOptionsDelegate));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

referendum(server);
routes(server);
server.listen(port);

server.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" })
})

console.log(`Graphql is running at http://localhost:${ port }/referendums/graphql`);
