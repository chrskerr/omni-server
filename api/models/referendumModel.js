
//// MONGO 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const issues = new Schema({
    issueId: {
        type: String,
        unique: true
    },
    question: String,
    summary: String,
    description: String,
    caseFor: String,
    caseAgainst: String,
    closeDate: Date
}, { collection: 'issues' });

module.exports = mongoose.model('issues', issues);

