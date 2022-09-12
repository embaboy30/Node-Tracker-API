const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    goalDate: {
        type: Date,
        require: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Todo', todoSchema);