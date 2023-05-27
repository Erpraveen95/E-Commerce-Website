const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@cluster0.6ksoj3r.mongodb.net/?retryWrites=true&w=majority`)
        .then(client => {
            console.log('connected!!')
            _db = client.db()
            callback()
        })
        .catch(error => {
            console.log(error)
            throw error
        })
}
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;