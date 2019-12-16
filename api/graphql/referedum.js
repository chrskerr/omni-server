// graphql routes 
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const md5 = require('md5');
const mongoose = require('mongoose');
const Issue = mongoose.model('issues');

module.exports = app => {
  
  app.use('/referendums/graphql', expressGraphql({
    schema: schema, // schema: schema
    rootValue: root,
    graphiql: true
    }));

};


const schema = buildSchema(`
    type Query {
        getIssue(issueId: String): Issue,
        getIssues: [Issue],
        getToken(issueId: String!, licence: Int!, surname: String): Token,
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
        message: String
    },
    type Confirmation {
        message: String
    }
`);

/// Graphql models
const getIssue = async function ({issueId}) {
    if (issueId) {
        const res = await Issue.findOne({issueId: issueId})
        return res
    } else { 
        const res = Issue.find({})
        return res
    }
};

const getToken = (args) => {
    return {
        token: md5(`${Math.random()}${args.issueId}`), // need to add a token check for uniqness
        message: 'success'
    }
};

// Graphql controller
const root = {
    getIssue: getIssue,
    getIssues: getIssue,
    getToken: getToken,
    giveToken: () => {return {message: 'token received'}}
};

