// CRUD // create, read, update, delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager-app';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  }
  const db = client.db(databaseName);
  
  db.collection('tasks').findOne({ _id: new ObjectID("5cf43dd5e785371face9c879") }, (error, task) => {
    if (error) {
      return console.log('Unable to find task');
    }
    console.log(task);
  });

  db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    if (error) {
      return console.log('No tasks found with that criteria');
    }
    console.log(tasks);
  });
});

  // db.collection('users').findOne({ _id: new ObjectID("5cf43dd5e785371face9c879") }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch');
  //   }
  //   console.log(user);
  // });
  // db.collection('users').find({ age: 27 }).toArray((error, users) => {
  //   if (error) {
  //     return console.log('Unable to fetch');
  //   }
  //   console.log(users);
  // });
  // db.collection('users').find({ age: 27 }).count((error, count) => {
  //   if (error) {
  //     return console.log('Unable to fetch');
  //   }
  //   console.log(count);
  // });
  // db.collection('users').insertOne({
  //   name: 'Vikram',
  //   age: 26
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user');
  //   }
  //   console.log(result.ops);
  // });
  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen',
  //     age: 28
  //   }, 
  //   {
  //     name: 'Gunther',
  //     age: 27
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert docs')
  //   }
  //   console.log(result.ops);
  // });
  // db.collection('tasks').insertMany([
  //   {
  //     description: 'React Course',
  //     completed: true
  //   },{
  //     description: 'Node Course',
  //     completed: false
  //   },{
  //     description: 'Portfolio',
  //   completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert docs');
  //   }
  //   console.log(result.ops);
  // });