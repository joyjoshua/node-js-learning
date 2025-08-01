const {MongoClient} = require('mongodb');

require('dotenv').config({path: '../local.env'});

const URI = process.env.DB_CLIENT_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

const client = new MongoClient(URI);

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    //Read
    // const result = await collection.find({}).toArray();
    // console.log('docs', result);

    //Add
    const data = {
        first_name: 'hermoine',
        last_name: 'granger',
        city: 'London',
        hyper_level: '9',
    };

    const insertResult = await collection.insertOne(data);
    console.log('Inserted doc', insertResult);

    //count

    // const countDocs = await collection.countDocuments({});
    // console.log('Number of Docs', countDocs);
    //find by filters

    const results = await collection.find({first_name: 'Harry'}).toArray();
    console.log('Number of Harry', results)
    return 'done';

}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());


/*

Homework, do a CRUD operations of collections
and read the doc on collection and try all methods

*/