const mongoose = require("mongoose");
const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {

    // list all days and workouts 
     app.get("/api/workouts", (req,res) => {
          db.Day.aggregate([
            {
              $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
                totalReps: { $sum: "$exercises.reps" },
                totalSets: { $sum: "$exercises.sets" }
              }
            },
            {
              $addFields: { totalSetReps:
                { $multiply: [ "$totalReps", "$totalSets"] } 
               
                
                }
            }
            ,
             {
              $addFields: { totalWeight:
                { $multiply: [ "$totalWeight", "$totalSetReps"] } 
                
                }
            }
         ])
         .then(day => {
            res.json(day);
          })
          .catch(err => {
            res.json(err);
          });
     })

     // get the summary data for 7-day data
     app.get("/api/workouts/range", (req,res) => {
        db.Day.aggregate([
            {
              $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
                totalReps: { $sum: "$exercises.reps" },
                totalSets: { $sum: "$exercises.sets" }
              }
            },
            {
              $addFields: { totalSetReps:
                { $multiply: [ "$totalReps", "$totalSets"] } 
               
                
                }
            }
            ,
             {
              $addFields: { totalWeight:
                { $multiply: [ "$totalWeight", "$totalSetReps"] } 
                
                }
            }
         ]).sort({'day': -1}).limit(7)
        .then(day => {
           res.json(day);
         })
         .catch(err => {
           res.json(err);
         });
    })

    // create new workout (Day)
    app.post("/api/workouts", (req,res) => {
        db.Day.create(req.body)
        .then(workout => {
          res.json(workout);
        })
        .catch(err => {
          res.json(err);
        });
    })

    // create new workout (Day)
    app.post("/api/workouts", (req,res) => {
        db.Day.create(req.body)
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    })

    // add exercises 
    app.put("/api/workouts/:id", (req,res) => {
        db.Day.updateOne(
          {
            _id: mongojs.ObjectId(req.params.id)
          },
          {
            $push: { exercises: req.body } 
          }
        )
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    })

}
