const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')

const pusher = new Pusher({
    app_id: '1139685',
    key: '6cdfa6cd8445fd6f5236',
    secret: '4328ca4929e9dbb41f43',
    cluster: 'eu',
    encrypted: true,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.set('port', 5000)
app.get('/', (req, res) => {
    res.send('Welcome')
})

app.post('/prices/new', (req, res) => {
    pusher.trigger('coin-prices', 'prices', {
        prices: req.body.prices,
    })
    res.sendStatus(200)
})

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})
