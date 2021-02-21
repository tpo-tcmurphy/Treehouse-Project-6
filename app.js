// Dependencies
const express = require('express')
const app = express()
const port = 3000

const data = require('./data.json')

// set the static route
app.use('/static', express.static('public'))

// set the view engine to pug
app.set('view engine', 'pug')

// root route
app.get('/', (req, res) => {
  res.render('index', data)
})

// about route
app.get('/about', (req, res) => {
  res.render('about', data)
})
// project route with error handler
app.get('/project/:id', (req, res) => {
  const projectIndex = parseInt(req.params.id) - 1
  res.render('project', data.projects[projectIndex], (err, html) => {
    if (err) {
      console.log('Something went wrong, please go back.')
      res.render('error', {
        err: {
          message: 'Something went wrong, please go back.',
          status: 500
        }
      })
    } else {
      res.send(html)
    }
  })
})

// 404 route handler
app.use((req, res, next) => {
  console.log('Sorry, page not found. Please go back. ')
  res.render('page-not-found', {
    err:
    {
      message: 'That page does not exist, please go back.',
      status: 404
    }
  })
})

// listens to localhost:3000
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}...`)
})
