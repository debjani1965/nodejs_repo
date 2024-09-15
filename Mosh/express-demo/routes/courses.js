const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

router.get('/', (req, res, next) => {
    res.send(courses);
});

router.get('/:id', (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not fund");

    res.status(200).send(course);
});

router.post('/', (req, res, next) => {
    const { error, value } = validateCourse(req.body);

    if (error) return res.status(400).send(`Validation Error: ${error.details[0].message}`);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    } 

    courses.push(course);
    
    res.status(201).send(course);
});

router.put("/:id", (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");

    const { error, value } = validateCourse(req.body);

    if (error) return res.status(400).send(`Validation Error: ${error.details[0].message}`);

    course.name = req.body.name;
    
    res.status(200).send(course);
});

router.delete('/:id', (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.status(200).send("Courese deleted successfully");
});

function validateCourse(course) {
    const  schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

module.exports = router;