// graphql routes 
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const md5 = require('md5');
const mongoose = require('mongoose');
const Issues = mongoose.model('issues');
const People = mongoose.model('people');
const Votes = mongoose.model('votes');

module.exports = app => {
  
  app.use('/referendums/graphql', expressGraphql({
    schema: schema, // schema: schema
    rootValue: root,
    graphiql: true
    }));

};


const schema = buildSchema(`
    type Query {
        getIssue(issueId: String!): Issue,
        getIssues: [Issue],
        getIdentifier(licence: String!, state: String!, surname: String!): Identifier,
        getToken(issueId: String!, identifier: String!): Token,
        giveToken(token: String!, vote: Boolean!): Confirmation
    },
    type Issue {
        issueId: String,
        question: String,
        summary: String,
        description: String,
        caseFor: String,
        caseAgainst: String,
        closeDate: String
    },
    type Token {
        token: String,
    },
    type Confirmation {
        message: String
    },
    type Identifier {
        identifier: String
    }
`);

/// Graphql models
const getIssue = async function ({issueId}) {
    if (issueId) {
        const res = await Issues.findOne({issueId: issueId})
        return res
    } else { 
        const res = Issues.find({})
        return res
    }
};

const getToken = (args) => {
    // need to add a token check for uniqness - if ( token.save() ) 
    // token generation is currently bad
    // need to check that they havne't voted in this issue yet too
    
    return {
        token: md5(`${Math.random()}${args.issueId}`),
    }
};

const getIdentifier = (args) => {
    // this is where the RTA check should occur 
    // TO-DO check this again

    return {
        identifier: md5(args)
    }
};

// Graphql controller
const root = {
    getIssue: getIssue,
    getIssues: getIssue,
    getToken: getToken,
    giveToken: () => {return {message: 'token received'}},
    getIdentifier: getIdentifier
};

