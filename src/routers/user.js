const express = require('express');

const User = require('../models/user');

const userRoute = new express.Router();

userRoute.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRoute.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRoute.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRoute.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['name', 'email', 'password', 'age'];

  const isValidOperation = updates.every(update =>
    validUpdates.includes(update)
  );
  console.log(isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send('Error : Not a valid update..!!!');
  }

  const _id = req.params.id;

  console.log('id :', _id);

  try {
    const user = User.findById(req.params.id);

    updates.forEach(update => {
      user[update] = req.params[update];
    });
    await user.save();

    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runvalidators: true
    // });
    // console.log(user);

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRoute.post('/users/login',async (req,res)=>{
  try{
    const user = await User.findByCredentials(req.body.email,req.body.password);
    console.log(user);
    
    res.send(user);
  }
  catch(e){
    console.log(e);
    
    res.status(400).send(e.message);
  }
  

})

userRoute.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOneAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = userRoute;
