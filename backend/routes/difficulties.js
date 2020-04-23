const router = require('express').Router();
let Difficulty = require('../models/difficulties.model');

router.route('/').get((req, res) => {
    Difficulty.find()
      .then(difficulties => res.json(difficulties))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const value = Number(req.body.value);

    const newDifficulty = new Difficulty({
      name,
      value,
  });

    newDifficulty.save()
      .then(() => res.json('Difficulty added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;