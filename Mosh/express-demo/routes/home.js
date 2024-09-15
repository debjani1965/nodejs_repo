const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
    res.render('index', {title: "Express APP", message:"Hello"})
});

module.exports = router;