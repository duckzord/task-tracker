const router = require('express').Router();
let Size = require('../models/sizes.model');

router.route('/').get((req, res) => {
    Size.find()
      .then(sizes => res.json(sizes))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const value = Number(req.body.value);

    const newSize = new Size({
      name,
      value,
  });

    newSize.save()
      .then(() => res.json('Size added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;