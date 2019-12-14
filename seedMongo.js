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

global.Propositions = require('./api/models/referendumModel.js')

const Propositions = mongoose.model('propositions');

Propositions.deleteMany({}, (err) => {
    console.log(err)
})

const word1 = new Propositions({
    prop: 'PROP0001',
    description: 'Something'
})

word1.save()

const word2 = new Propositions({
    prop: 'PROP0002',
    description: 'Something'
})
word2.save()

const word3 = new Propositions({
    prop: 'PROP0003',
    description: 'Something'
})
word3.save()

const word4 = new Propositions({
    prop: 'PROP0004',
    description: 'Something'
})
word4.save().then(() => {
    mongoose.disconnect()
})

