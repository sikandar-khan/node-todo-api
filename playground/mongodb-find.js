const {
    MongoClient,
    ObjectID
} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (er, db) => {
    if (er) {
        return console.log('Unable to connect to the server');
    }
    console.log('server is up');
    db.db('TodoApp').collection('Todos').find({
        _id: new ObjectID('5b478a40bd76081ce45bfcbd')
    }).toArray().then((result) => {
        console.log(JSON.stringify(result, undefined, 1));
    }).catch((err) => {
        console.log(err);
    });
});