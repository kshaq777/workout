const db = require("../models");

module.exports = function(app) {

    app.get("/api/stats", (req, res) => {
        db.Day.find(["exercises.weight"])
          .then(day => {
            res.json(day);
          })
          .catch(err => {
            res.json(err);
          });
      });

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
