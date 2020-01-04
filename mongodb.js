//performing CRUD operation.

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://0.0.0.0:27017';
const databaseName = 'task-manager';

const id = new ObjectID();

console.log(id);


MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Error while connecting to the database');
    }
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //   user: 'Sandeep',
    //   Age: 25
    // });
  }
);
