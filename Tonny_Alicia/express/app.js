const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname +"/public"));

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');

app.use('/', (req, res, next) => {
    console.log('Request Url::' + req.url);
    next();
});

app.get('/', (req, res, next) => {
    res.render('index')
});

app.get('/person/:id', (req, res, next) => {
  res.render('person', { ID: req.params.id });
})
app.post('/person-details', urlencodedParser, (req, res, next) => {
    console.log("====",req.body);
    const fname = req.body.fname;
    const lname = req.body.lname;
    console.log(fname, lname)
    res.render('persondetails', {fname: fname, lname: lname})
})

app.get('/api', (req, res) => {
    res.json({
        name: "debjani"
    })
})

app.listen(port, ()=> {
    console.log("running...");
})