const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: [true, 'String is required']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'String is required']
    }
});

const Exercise = mongoose.model("Book", ExerciseSchema);

module.exports = Exercise;
