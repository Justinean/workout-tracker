const router = require('express').Router();
const path = require('path')
const {Workout} = require('../models');

router.get('/stats', async (req, res) => {
    try {
        res.sendFile('stats.html', {root: './public'});
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}) 

module.exports = router;