const router = require('express').Router();
let Priority = require('../models/priorities.model');

router.route('/').get((req, res) => {
  Priority.find()
      .then(priorities => res.json(priorities))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const value = Number(req.body.value);

    const newPriority = new Priority({
      name,
      value,
  });

    newPriority.save()
      .then(() => res.json('Priority added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;