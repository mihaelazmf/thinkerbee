const mongoose = require("mongoose");
const { Schema } = mongoose;

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  modules: {
    type: [moduleSchema],
    required: true,
  },
});

const Course = mongoose.model("courses", courseSchema);
module.exports = Course;
