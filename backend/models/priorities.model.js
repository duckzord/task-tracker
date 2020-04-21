const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prioritySchema = new Schema ({
    name: { type: String, required: true},
    value: { type: Number, required: true}
}, {
    timestamps: true,
});

const Priority = mongoose.model('Priority', prioritySchema);

module.exports = Priority;