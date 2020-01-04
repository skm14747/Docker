const express = require('express');

const Task = require('../models/task');


const taskRoute = express.Router();

taskRoute.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.status(200).send(tasks);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

taskRoute.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

taskRoute.post('/task', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

taskRoute.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['description', 'completed'];

  const isValidOperation = updates.every(update =>
    validUpdates.includes(update)
  );
  console.log(isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send('Error : Not a valid update..!!!');
  }
  const _id = req.params.id;
  // console.log('id :', _id);
  try {
    const task = User.findById(req.params.id);

    updates.forEach(update => {
      user[update] = req.params[update];
    });
    await task.save();
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runvalidators: true
    // });
    // console.log(task);

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

taskRoute.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const task = await Task.findOneAndDelete(_id);
    console.log(task);

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = taskRoute;
