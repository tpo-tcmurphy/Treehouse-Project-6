const express = require('express')

const app = express()

app.set('view engine', 'pug')

const mainRoutes = require('./routes')
const projectRoutes = require('./routes/projects')

app.use(mainRoutes)
app.use('/projects', projectRoutes)

app.use('/static', express.static('public'))

app.use((req, res, next) => {
  const err = new Error('Page Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.locals.error = err
    res.render('page-not-found')
  } else if (err.status === undefined) {
    err.status = 500
    err.message = 'Something went wrong!'
    res.locals.error = err
    res.render('error')
  } else {
    res.locals.error = err
    res.render('error')
  }
})

app.listen(3000, () => {
  console.log('The application is running on localhost:3000')
})
