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
        getToken(issueId: String!, licence: String!, state: String!, surname: String!): Token,
        giveToken(token: String!, response: String!): Confirmation
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
    // math.Random() is 16 decimal places, then md5 that with the IssueId, shoudl always be unique.

    // need to re-check ID here too!
    // need to double-check that they havne't voted in this issue yet too


    return {
        token: md5(`${Math.random()}-${args.issueId}`),
    }
};

const getIdentifier = (args) => {
    // this is where the RTA check should occur 
    // TO-DO check this again

    // these are always coming out the same

    return {
        identifier: md5( JSON.stringify(args) )
    }
};

const saveToken = ( args ) => {

    return {
        message: 'token received'
    }
};

// Graphql controller
const root = {
    getIssue: getIssue,
    getIssues: getIssue,
    getToken: getToken,
    giveToken: saveToken,
    getIdentifier: getIdentifier
};

