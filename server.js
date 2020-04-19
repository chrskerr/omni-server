const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// const routes = require('./api/routes/Routes.js');
const referendum = require('./api/graphql/graphql.js')

const port = process.env.PORT || 3125;
const server = express();

/// re-add when not using graphiql

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

// server.use(cors());
server.use(cors(corsOptionsDelegate));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

referendum(server);
// routes(server);
server.listen(port);

server.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" })
})

console.log(`Graphql is running at http://localhost:${ port }/referendums/graphql`);
