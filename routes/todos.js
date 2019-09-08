const express = require('express');
const router = express.Router();
const Todo = require('../model/todo');

// Find All
router.get('/', (req, res) => {
  Todo.findAll()
    .then((todos) => {
      // if(!todos.length) return res.status(404).send({err : 'Todo not Found'});
      res.json(todos);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by Id
router.get('/:id', (req, res) => {
  Todo.findOneByTodoid(req.params.id)
    .then((todo) => {
      // if(!todo) return res.status(404).send({err : 'Todo not Found'});
      res.json({todo});
    })
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post('/', (req, res) => {
  Todo.create(req.body)
    .then(todo => Todo.findAll())
    .then(todos => res.json(todos))
    .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put('/:id', (req, res) => {
  Todo.updateByTodoid(req.params.id, req.body)
    .then(todo => Todo.findAll())
    .then(todos => res.json(todos))
    .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete('/:id', (req, res) => {
  Todo.deleteByTodoid(req.params.id)
    .then(() => Todo.findAll())
    .then(todos => res.json(todos))
    .catch(err => res.status(500).send(err));
});


module.exports = router;
