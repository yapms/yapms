import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

async function getClient() {
  if ( client === null ) {
    client = await new MongoClient('mongodb://root:password@mongodb:8083').connect();
  }

  return client;
}

async function  getCollection() {
  const database = (await getClient()).db("yapms");
  const collection = database.collection("images");
  return collection;
}

interface ImageInsert {
  createdAt: Date,
  name: string,
  data: string,
  length: number
}

async function insertImage(data: ImageInsert) {
  const collection = await getCollection();
  collection.insertOne(data);
}


interface ImageFind {
  name: string;
}

async function getImage(data: ImageFind) {
  const collection = await getCollection();
  const image = collection.findOne(data);
  return image;
}

export { insertImage, getImage };