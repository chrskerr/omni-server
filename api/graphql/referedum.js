// graphql routes 
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const md5 = require('md5');
const mongoose = require('mongoose');
const Issue = mongoose.model('issues');
const Person = mongoose.model('people');
const Vote = mongoose.model('votes');

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
        getIssues(identifier: String): [Issue],
        getIdentifier(licence: String!, state: String!, surname: String!): Identifier,
        getToken(issueId: String!, licence: String!, state: String!, surname: String!): Token,
        giveToken(token: String, response: String, identifier: String, issueId: String): Confirmation
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
        identifier: String,
        err: String
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
        const res = await Issue.findOne({issueId: issueId})
        return res
    } else { 
        const res = await Issue.find({})
        return res
    }
};

const getToken = async function (args) {
    
    const { identifier } = await getIdentifier(args);

    const createPerson = async (args) => {
        const output = await Person.create({
            identifier: identifier,
            issueId: args.issueId,
            status: 'token issued',
            hash: md5(`${identifier}-${args.issueId}`) // gives a unique string for voter / user, for DB validation 
        });
        return output;
    }

    const createToken = async (issueId) => {
        const output = await Vote.create({
            token: md5(`${Math.random()}-${issueId}`),
            issueId: issueId,
            status: 'token issued'
        })
        return output
    }
      
    try {
        await createPerson(args) 
    } catch (e) {
        // what happens if person-saving fails 
        return {
            token: '',
            err: "You've already voted."
        }
    }

    try {
        let output = await createToken(args.issueId)
        return {
            token: output.token,
            identifier: identifier,
            err: ''
        }
    } catch (e) {
        return {
            token: '',
            err: "Something went wrong, please try again."
        }
    }
}

const getIdentifier = (args) => {
    // this is where the RTA check should occur 
    // TO-DO check this again

    // these are always coming out the same

    return {
        identifier: md5(`${args.licence}`)
    }
};

const giveToken = ( args ) => {
    Person.updateOne({
        identifier: args.identifier,
        issueId: args.issueId
    }, {
        status: 'token returned'
    }).then( (res) => {
        //console.log('person', res)
    });
    Vote.updateOne({
        token: args.token
    }, {
        status: 'token returned',
        response: args.response
    }).then( (res) => {
        //console.log('vote', res)
    });

    return {
        message: 'token received'
    }
};

// Graphql controller
const root = {
    getIssue: getIssue,
    getIssues: getIssue,
    getToken: getToken,
    giveToken: giveToken,
    getIdentifier: getIdentifier
};