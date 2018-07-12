const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, db) => {
    if (error) {
        return console.log('Unable to connect to the server');
    }
    // db.db('TodoApp').collection('Todos').insertOne({
    //     text: 'Something todo',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log(`Unable to insert ${error}`);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 1));
    // });
    console.log('Connected to server!');
    db.db('TodoApp').collection('Users').insertOne({
        name:'Zabiullah',
        age:28,
        location:'Karabuk'
    }, (error, result) => {
        if (error) {
            return console.log(`Unable to insert ${error}`);
        }
        console.log(JSON.stringify(result.ops, undefined, 1));
    });
    db.close();
});