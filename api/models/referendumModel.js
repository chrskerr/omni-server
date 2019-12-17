
//// MONGO 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const issues = new Schema({
    issueId: {
        type: String,
        unique: true,
        index: true
    },
    question: String,
    summary: String,
    description: String,
    caseFor: String,
    caseAgainst: String,
    closeDate: Date
}, { collection: 'issues' });

module.exports = mongoose.model('issues', issues);

const people = new Schema({
    identifier: String,
    issueId: String,
    status: String,
    hash: {
        type: String,
        unique: true,
        index: true
    }
}, { collection: 'people' });

module.exports = mongoose.model('people', people);

const votes = new Schema({
    token: {
        type: String,
        unique: true,
        index: true
    },
    issueId: String,
    status: String,
    response: String
}, { collection: 'votes' });

module.exports = mongoose.model('votes', votes);

