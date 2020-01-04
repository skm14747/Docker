const express = require('express');
require('./db/mongoose');
// const User = require('./models/user');
// const Task = require('./models/task');
const userRoute = require('./routers/user')
const taskRoute = require('./routers/task')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoute);
app.use(taskRoute);



// const bcrypt = require('bcrypt');

// const myFunction = async ()=>{
//     const password = 'sandeepM';
//     const hashedPassword = await bcrypt.hash(password,8);

//     console.log(password,hashedPassword);
// }

// myFunction();

app.listen(port, () => {
  console.log('app started at port ' + port);
});
