const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars enigne and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ayman Ahmed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayman Ahmed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "Looking for help ? Call us!",
        name: 'Ayman Ahmed'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, { longtude, latitude, location } = {}) => {
        if (error)
            return res.send({ error })

        forecast(longtude, latitude, (error, forecast) => {
            if (error)
                return res.send({ error })

            const weather = {
                forecast,
                location,
                address: req.query.address
            }
            res.send(weather)
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404 Page',
        errorMessage: 'Help article not found!',
        name: "Ayman Ahmed"
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404 Page',
        errorMessage: 'Page not found!',
        name: "Ayman Ahmed"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port + ".")
});