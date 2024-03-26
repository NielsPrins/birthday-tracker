import { Collection, MongoClient } from 'mongodb';

const globalForMongo = global as unknown as {
  _mongoClientPromise: Promise<MongoClient>;
};

const uri = process.env.MONGODB_URI ?? `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@127.0.0.1:27017`;

let client;
let clientPromise: Promise<MongoClient>;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/no-misused-promises
  if (!globalForMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalForMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalForMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function getMongoCollection(collection: string): Promise<Collection<Document>> {
  const client = await clientPromise;
  const db = client.db('db');
  return db.collection(collection);
}
