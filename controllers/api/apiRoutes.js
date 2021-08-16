const router = require('express').Router();
const db = require('../../models');


router.get('/workouts/range', async (req, res) => {
    let data = await db.Workout.find();
    let newdata = [];
    for (let i = 0; i < data.length; i++) {
        newdata.push({
            _id: data[i]._id,
            day: data[i].day,
            exercises: data[i].exercises,
            totalDuration: data[i].exercises[0].duration
        })
        for (let j = 0; j < data.length; j++) {
            if (i !== j && data[i].day.toLocaleString().split(",")[0].split("/")[1] === data[j].day.toLocaleString().split(",")[0].split("/")[1]) {
                newdata[i].totalDuration += data[j].exercises[0].duration;
            }
        }
    }
    res.json(newdata)
})

module.exports = router;