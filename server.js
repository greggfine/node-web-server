const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const info = `${now} ${req.method} ${req.url}`;
    fs.appendFile('log.txt', info + '\n', (err) => {
        if(err){
            console.log(err);
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        welcomePage: 'Welcome to my Page!'
    });
});

app.get('/project', (req, res) => {
    res.render('project');
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'bad request'
    })
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})