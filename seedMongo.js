const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
    `mongodb://127.0.0.1:27017/`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

global.Issue = require('./api/models/referendumModel.js')

const Issue = mongoose.model('issues');

Issue.deleteMany({}, (err) => {
    console.log(err)
})

const word1 = new Issue({
    issueId: 'ISSUE-0001',
    summary: 'This is issue one',
    question: 'Do you support changing ONE?',
    caseFor: "This is a good idea, a very good idea",
    caseAgainst: "I've never heard a worse idea in my life!",
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!'
})
word1.save()

const word2 = new Issue({
    issueId: 'ISSUE-0002',
    summary: 'This is issue two',
    question: 'Do you support changing TWO?',
    caseFor: "This is a good idea, a very good idea",
    caseAgainst: "I've never heard a worse idea in my life!",
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!'
})
word2.save()

const word3 = new Issue({
    issueId: 'ISSUE-0003',
    summary: 'This is issue three',
    question: 'Do you support changing THREE?',
    caseFor: "This is a good idea, a very good idea",
    caseAgainst: "I've never heard a worse idea in my life!",
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!'
})
word3.save()

const word4 = new Issue({
    issueId: 'ISSUE-0004',    
    summary: 'This is issue four',
    question: 'Do you support changing FOUR?',
    caseFor: "This is a good idea, a very good idea",
    caseAgainst: "I've never heard a worse idea in my life!",
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!'
})
word4.save().then(() => {
    console.log( Issue.find({}) )
    // mongoose.disconnect()
})

