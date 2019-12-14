
//// MONGO 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const propositions = new Schema({
    prop: String,
    description: String,
}, { collection: 'propositions' });

module.exports = mongoose.model('propositions', propositions);

