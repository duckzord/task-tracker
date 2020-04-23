const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const description = req.body.description;
    const priority = req.body.priority;
    const difficulty = req.body.difficulty;
    const size = req.body.size;
    const deadline = Date.parse(req.body.deadline);

    const newTask = new Task({
        description,
        priority,
        difficulty,
        size,
        deadline
    });

    newTask.save()
      .then(() => res.json('Task added!'))
      .catch(err => res.status(400).json('Error: ') + err);
});

router.route('/:id').get((req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.description = req.body.description;
      task.priority = req.body.priority;
      task.difficulty = req.body.difficulty;
      task.size = req.body.size;
      task.deadline = Date.parse(req.body.deadline);

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ') + err);
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;