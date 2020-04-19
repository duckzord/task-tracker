const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const priority = Number(req.body.priority);
    const deadline = Date.parse(req.body.deadline);

    const newTask = new Task({
        username,
        description,
        priority,
        deadline,
    });

    newTask.save()
      .then(() => res.json('Exercise added!'))
      .catch(err => res.status(400).json('Error: ') + err);
});

module.exports = router;