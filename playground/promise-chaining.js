const Task = require('../src/models/task');
require('../src/db/mongoose');

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({completed : false});

  return count;
};

deleteTaskAndCount('5d4af968263dc619704622ff').then((count)=>{
console.log(count);

}).catch((e)=>{
    console.log(e);
    
})
