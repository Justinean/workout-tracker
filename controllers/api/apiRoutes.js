const router = require('express').Router();
const { Workout } = require('../../models');
const db = require('../../models');

router.get('/workouts', async (req, res) => {
    let data = await db.Workout.find();
    let newdata = [];
    newdata.push({_id: data[data.length - 1]._id, day: data[data.length - 1].day, exercises: data[data.length - 1].exercises, totalDuration: 0})
    for (let i = 0; i < newdata[0].exercises.length; i++) {
        newdata[0].totalDuration += newdata[0].exercises[i].duration;
    }
    res.json(newdata)
})

router.get('/workouts/range', async (req, res) => {
    let data = await db.Workout.find();
    let newdata = [];
    for (let i = data.length - 7; i < data.length; i++) {
        newdata.push({_id: data[i]._id, day: data[i].day, exercises: data[i].exercises, totalDuration: 0})
        for (let j = 0; j < newdata[i - (data.length - 7)].exercises.length; j++) {
            newdata[i - (data.length - 7)].totalDuration += newdata[i - (data.length - 7)].exercises[j].duration;
        }
    }
    res.json(newdata)
})

router.post('/workouts', async (req, res) => {
    let data = {
        day: new Date(),
        exercises: []
    }
    await db.Workout.collection.insert(data)
    res.json(data)
})

router.put('/workouts/:id', async (req, res) => {
    let data = await db.Workout.find({ _id: req.params.id });
    let exercises = data[0].exercises
    let object = req.body;
    exercises.push(object)
    await db.Workout.updateOne({ _id: req.params.id }, { $set: { exercises } })
    data = await db.Workout.find({ _id: req.params.id });
    res.json(data);
})

module.exports = router;