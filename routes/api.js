const db = require("../models");

module.exports = function(app) {

    // list all days and workouts 
     app.get("/api/workouts", (req,res) => {
         db.Day.find({})
         .then(day => {
            res.json(day);
          })
          .catch(err => {
            res.json(err);
          });
     })

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
         ])
        .then(day => {
           res.json(day);
         })
         .catch(err => {
           res.json(err);
         });
    })

     

    //   app.get("/api/workouts", (req, res))

    // app.get("/api/add", (req, res) => {
        
    //     db.getCollection('days').aggregate(
    //         [
    //            {
    //              $addFields: {
    //                totalWeight: { $sum: "$exercises.weight" } ,
    //                totalDuration: { $sum: "$exercises.duration" },
    //                totalReps: { $sum: "$exercises.reps" },
    //                totalSets: { $sum: "$exercises.sets" }
    //              }
    //            },
    //            {
    //              $addFields: { totalSetReps:
    //                { $add: [ "$totalReps", "$totalSets"] } 
                  
                   
    //                }
    //            },
    //             {
    //              $addFields: { totalWeight:
    //                { $multiply: [ "$totalWeight", "$totalSets"] } 
                   
    //                }
    //            }
    //         ] 
    //         )

    // })

}
