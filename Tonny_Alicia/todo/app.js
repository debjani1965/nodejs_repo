const express = require('express');
const app =express();

var port = process.env.PORT || 3000;

app.arguments('/assets', express.static(__ditname + '/public'));

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log("running");
})