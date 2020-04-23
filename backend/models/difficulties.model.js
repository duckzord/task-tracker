const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const difficultySchema = new Schema ({
    name: { type: String, required: true},
    value: { type: Number, required: true}
}, {
    timestamps: true,
});

const Difficulty = mongoose.model('Difficulty', difficultySchema);

module.exports = Difficulty;