const express = require('express')
const redis = require('redis')

const app = express()

// connect to redis-server container
const client = redis.createClient({
	host: 'redis-server',
	port: 6379
})
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