const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // required for Express for JSON POST / PUT requests

// graphql routes 
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const md5 = require('md5');
const schema = buildSchema(`
    type Query {
        getProp(prop: String): Prop,
        getProps: [Prop],
        getToken(prop: String!, licence: Int!, surname: String): Token,
        giveToken(token: String!, vote: Boolean!): Confirmation
    },
    type Prop {
        prop: String,
        description: String
    },
    type Token {
        token: String,
        message: String
    },
    type Confirmation {
        message: String
    }
`);

/// Graphql models
const getProp = ( ) => {
    return {
        prop: 'PROP-0001',
        description: 'This is the description of the first prop'
    }
};

const getToken = (args) => {
    return {
        token: md5(`${Math.random()}${args.prop}`), // need to add a token check for uniqness
        message: 'success'
    }
};

// Graphql controller
const root = {
    getProp: getProp,
    getProps: getProp,
    getToken: getToken,
    giveToken: () => {return {message: 'token received'}}
};


global.Url = require('./api/models/Model.js');
const routes = require('./api/routes/Routes.js');

const port = process.env.PORT || 3125; // if the environment is dictating port use theirs, if not use 3125
const server = express();

server.use('/graphql', expressGraphql({
  schema, // schema: schema
  rootValue: root,
  graphiql: true
}));

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

routes(server);
server.listen(port);

server.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" })
})

console.log(`Graphql is running at http://localhost:${ port }/graphql`);
