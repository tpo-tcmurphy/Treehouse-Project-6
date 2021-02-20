const express = require('express')
const router = express.Router()
const data = require('../data.json')
const projects = data.projects

router.get('/:id', (req, res, next) => {
  const num = req.params.id
  // test the num property, for NaN and if it falls within range, or try/catch block
  if (num < projects.length) {
    res.render('project', projects[num])
  } else {
    err.status = 404
    next(err)
  }
})

module.exports = router
