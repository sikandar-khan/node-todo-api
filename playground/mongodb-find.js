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
    db.db('TodoApp').collection('Todos').updateOne({
        _id: new ObjectID('5b478a40bd76081ce45bfcbd')
    }, {
        $set: {
            text: 'food from store'
        }
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    db.db('TodoApp').collection('Todos').find({
        _id: new ObjectID('5b478a40bd76081ce45bfcbd')
    }).toArray().then((result) => {
        console.log(JSON.stringify(result, undefined, 1));
    }).catch((err) => {
        console.log(err);
    });
    // db.db('TodoApp').collection('Todos').deleteOne({_id:new ObjectID('5b478b3d63991c1a682b6c57')},(e,p)=>{
    //     if(e){
    //         return console.log('Cannot delete the selected doc');
    //     }
    //     console.log(`Successfully deleted ${p}`);
    // })
});