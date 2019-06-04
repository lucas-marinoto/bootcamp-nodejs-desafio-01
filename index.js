const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
// este app use abaixo é para o express saber lidar com informações de vinda de formulários
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

// Middlewares - Para checar se a pessoa digitou a idade
const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

// roteamento comum com o express - http://localhost:3000/
// Página inicial
app.get('/', (req, res) => {
  return res.render('start')
})
// Maior de Idade - http://localhost:3000/major
app.get('/major', checkAgeQueryParam, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

// Menor de Idade - http://localhost:3000/minor
app.get('/minor', checkAgeQueryParam, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

// Verifica idade enviada pelo formulário
app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(process.env.PORT || 3000)
