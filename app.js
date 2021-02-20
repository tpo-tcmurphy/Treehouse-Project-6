const express = require('express')
const app = express()
const projects = require('./data.json')

// Set static route and view engine to pug
app.use('/static', express.static('public'))
app.set('view engine', 'pug')

// Route Handlers
app.get('/', (req, res) => {
  res.render('index', projects)
})

app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/project/:id', (req, res, next) => {
  const projectIndex = global.parseInt(req.params.id) - 1
  res.render('project', projects.projects[projectIndex])
})

// App listener
app.listen(3000, console.log('App is listening to port 3000'))
