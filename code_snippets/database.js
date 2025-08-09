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

    //Accessors
    // dbName()


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
    const data1 = {
        first_name: 'walter',
        last_name: 'white',
        city: 'New Mexico',
        hyper_level: '10',
    };
    const data2 = {
        first_name: 'jesse',
        last_name: 'pinkman',
        city: 'New Mexico',
        hyper_level: '20',
    };

    //insert
    const insertResult = await collection.insertOne(data);
    console.log('Inserted doc', insertResult);

    //count
    const countDocs = await collection.countDocuments({});
    console.log('Number of Docs', countDocs);

    //find by filters
    const results = await collection.find({first_name: 'Harry'}).toArray();
    console.log('Number of Harry', results);

    //insertOne
    const addNewDoc = await collection.insertOne(data);
    console.log('insertOne - New Doc added', addNewDoc);

    //insertMany
    const addMany = await collection.insertMany([data1, data2]);
    console.log('insertMany used', addMany);

    //find
    const findDoc = await collection.find({first_name: 'walter'}).toArray();
    console.log('Are you Heisenberg?', findDoc, `you're goddamn right`);

    //findOne
    const findOne = await collection.findOne({first_name: 'hermoine'});
    console.log('fetched the first hermoine', findOne);

    //updateOne 
    const update = {
        $set: {
            last_name: 'Potter',
        },
        $inc: {
            hyper_level: 1,
        },
        $unset: {
            last_namel: "",
            city: "",
        },
        $set: {
            country: 'UK',
        }
    };
    const updateHarry = await collection.updateOne({first_name: 'harry'}, update);
    console.log('updated harry hype level', updateHarry);

    //updateMany
    const update1 = {
        $set: {
            last_name: 'Weasley',
            country: 'UK',
        },
    };
    const updateHermoine = await collection.updateMany({first_name: 'hermoine'}, update1);
    console.log('updated hermoine deeets', updateHermoine);

    //replaceOne
    const replaceDoc = {
        first_name: 'j',
        last_name: 'cube',
        city: 'Bengaluru',
        hyper_level: 'Infinity',
    }
    const updateJoy = await collection.replaceOne({first_name: 'j'}, replaceDoc);
    console.log('Replaced joy doc with jcube doc', updateJoy);

    //deleteOne
    const deleteHarry = await collection.deleteOne({first_name: 'harry'});
    console.log('Voldemort gotchu buddy, you dead homes', deleteHarry);

    //deleteMany
    const deleteHermoine = await collection.deleteMany({first_name: 'hermoine'});
    console.log('Ron you a widow mate, your gal is dead', deleteHermoine);

    //countDocuments
    const countDocuments = await collection.countDocuments({city: 'New Mexico'});
    console.log('Number of folks in New Mexico', countDocuments);

    //aggregate
    const pipeline = [
        {
            $match: {city: "New Mexico"}
        },
        {
            $sort: {first_name: 1}
        },
    ];
    const aggs = await collection.aggregate(pipeline).toArray();
    console.log('aggs res:', aggs);
    
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