const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const logger = require('./middleware/logger.js');
const auth = require('./middleware/auth.js');
const config = require('config');
const homeRouter = require('./routes/home.js');
const courseRouter = require('./routes/courses.js');

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

//Configuration
console.log('Application Name:' + config.get('name'))
console.log('Application mail server:' + config.get('mail.host'))
console.log('Application mail password:' + config.get('mail.password'))
 
if(app.get('env') == 'development') {
    app.use(morgan('tiny'));
    debug('Morgan is enabled')   
}

app.use(logger);
app.use(auth);
app.use('/', homeRouter);
app.use('/api/courses', courseRouter);

app.listen(port, () => {
    console.log(`Listening at port ${ port}`);
});

