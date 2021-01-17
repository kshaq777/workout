const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DaySchema = new Schema({
  
  day: {
    type: String,
    trim: true,
    default: Date.now,
    required: 'Day is requried'
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: 'Type is requried'
    },
    name: {
      type: String,
      trim: true,
      required: 'Name is requried'
    },
    duration: {
      type: Number,
      trim: true,
      required: "Must have spent time working out",
      validate: [
          ({length}) => length >= 1,
          "duration must be 1 minute or more"
        ]
  
    },
    weight: {
      type: Number,
      trim: true,
      required: "How Much?",
      validate: [
          ({length}) => length >= 1,
          "weight must be 1 or more"
        ]
  
    },
    distance: {
      type: Number,
      trim: true,
      required: "How Much?",
      validate: [
          ({length}) => length >= 1,
          "distance must be 1 or more"
        ]
  
    },
    reps: {
      type: Number,
      trim: true,
      required: "How Many?",
      validate: [
          ({length}) => length >= 1,
          "reps must be more than 1 zero"
        ]
  
    },
    sets: {
      type: Number,
      trim: true,
      required: "Dont skip sets!",
      validate: [
          ({length}) => length >= 1,
          "must do at least 1 set"
        ]
  
    }
  }]

});

const Day = mongoose.model("Day", DaySchema);

module.exports = Day;
