// graphql routes 
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const Issues = require('../../issuesSQL/issuesSQL.js');
const Blockchain = require('../../blockchain/blockchain.js')

module.exports = app => {
    app.use('/referendums/graphql', expressGraphql({
        schema: schema, // schema: schema
        rootValue: root,
        graphiql: true
    }));
    app.route('/referendums/analytics').get( (req, res) => {
            res.json( Blockchain.dataDump() );
        });
};

const schema = buildSchema(`
    type Query {
        getIssue(issueId: Int!, identifier: String): Issue,
        getIssues(identifier: String): [Issue],    
        checkIdentity(licence: String!, state: String!, surname: String!): Identifier,      
        recordVote(issueId: Int!, response: String!, licence: String!, state: String!, surname: String!): Confirmation,
    },

    type Issue {
        issueId: Int,
        question: String,
        summary: String,
        description: String,
        caseFor: String,
        caseAgainst: String,
        closeDate: String
    },

    type Identifier {
        identifier: String,
        alreadyVoted: [Int]
    },

    type Confirmation {
        message: String,
        error: String
    }
`);


const root = {
    getIssue: (args) => {
        return Issues.getOne(args)
        },
    getIssues: (args) => {
        return Issues.getAll(args);
        },
    recordVote: (args) => {
        return Blockchain.recordVote(args)
    },
    checkIdentity: (args) => {
        const identifier = Blockchain.getIdentifier(args);
        return {
            identifier: identifier,
            alreadyVoted: Blockchain.personsVoteHistory(identifier)
        }
    }
};
