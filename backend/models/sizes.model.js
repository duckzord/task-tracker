const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sizeSchema = new Schema ({
    name: { type: String, required: true},
    value: { type: Number, required: true}
}, {
    timestamps: true,
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;