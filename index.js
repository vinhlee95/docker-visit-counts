const express = require('express')
const redis = require('redis')

const app = express()

const client = redis.createClient()
client.set('visits', 0)

app.get('/', (req, res) => {
	client.get('visits', (error, visits) => {
		if(error) {
			console.log(error)
			return
		}

		res.status(200).send(`Number of visit: ${visits}`)
		client.set('visits', parseInt(visits) + 1)
	})
})

app.listen(8080, () => console.log('Server is running on port 8080'))