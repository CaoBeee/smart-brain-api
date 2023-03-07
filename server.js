const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const postgres = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'test',
		database: 'smart-brain',
	},
})

postgres
	.select('*')
	.from('users')
	.then(data => {
		console.log(data)
	})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('success')
})

app.post('/signin', (req, res) => {
	signIn.handleSignIn(req, res, postgres, bcrypt)
})

app.post('/register', (req, res) => {
	register.handleRegister(req, res, postgres, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, postgres)
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, postgres)
})

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res)
})

app.listen(3000, () => {
	console.log('app is running on port 3000')
})
