// graphql routes 
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const md5 = require('md5');
const mongoose = require('mongoose');
const Propositions = mongoose.model('propositions');

module.exports = app => {
  
  app.use('/referendums/graphql', expressGraphql({
    schema: schema, // schema: schema
    rootValue: root,
    graphiql: true
    }));

};


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
const getProp = async function ({prop}) {
    if (prop) {
        const res = await Propositions.findOne({prop: prop})
        return {
            prop: res.prop,
            description: res.description
        }
    } else { 
        const res = Propositions.find({})
        return res
    }
    return {
        prop: "7",
        desc: 'some'
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

