import mongo from "mongodb";

export const COLLECTIONS = {
  COMMENTS: "comments",
  VOTES: "votes",
  TAGS: "tags",
  USERNAMES: "usernames",
  USERS: "users",
  CATEGORIES: "categories",
  FOLLOW: "follow",
  PROJECTS: "projects",
  IOU: "iou",
  POF: "pof",
  PROJECT_FIRENDS: "project-friends",
  FEEDBACKS: "feedbacks",
  VC: "verified-credentials",
  DID_SESSIONS: "did-sessions",
  CREDENTIALS: "credentials",
  CERAMIC_PROFILE: "ceramic-profile",
  ON_CHAIN_CREDENTIALS: "on-chain-credentials",
};

const repository = {
  client: undefined,
  db: undefined,

  async init() {
    const MongoClient = mongo.MongoClient;

    const url = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;

    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };

    let client;

    if (!global._mongoClientPromise) {
      client = new MongoClient(url, options);
      global._mongoClientPromise = client.connect();
    }
    repository.clientPromise = global._mongoClientPromise;
    repository.db = (await repository.clientPromise).db(dbName);
  },

  async getDB() {
    await repository.init();
    return repository.db;
  },

  getObjectId(id = null) {
    const ObjectId = mongo.ObjectId;
    return id ? new ObjectId(id) : new ObjectId();
  },

  async saveDoc(collection, data, actorId = null) {
    const db = await repository.getDB();
    const objectToSave = {
      ...data,
      _id: data._id
        ? repository.getObjectId(data._id).toString()
        : repository.getObjectId().toString(),
    };

    if (data._id) {
      objectToSave.editDate = new Date();
      objectToSave.editBy = actorId;
    } else {
      objectToSave.createDate = new Date();
      objectToSave.createdBy = actorId;
    }

    const doc = await db
      .collection(collection)
      .findOneAndUpdate(
        { _id: objectToSave._id },
        { $set: objectToSave },
        { upsert: true, returnDocument: "after" }
      );

    return doc.value || objectToSave;
  },

  async findOneDoc(collection, filter) {
    const db = await repository.getDB();
    const result = await db.collection(collection).findOne(filter);
    return result;
  },
  async findManyDoc(collection, filter, sort = {}, skip = 0, limit = 1000) {
    const db = await repository.getDB();
    const result = await db
      .collection(collection)
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
    return result;
  },

  async aggregateQuery(collection, query) {
    const db = await repository.getDB();

    const aggregated = await db
      .collection(collection)
      .aggregate(query)
      .toArray();
    return aggregated;
  },

  async insertManyDocs(collection, docs) {
    const db = await repository.getDB();
    const result = await db.collection(collection).insertMany(docs);
    return result;
  },

  async deleteOneDoc(collection, filter) {
    const db = await repository.getDB();
    const result = await db.collection(collection).deleteOne(filter);
    return result;
  },

  async bulkWrite(collection, query) {
    const db = await repository.getDB();
    return db.collection(collection).bulkWrite(query);
  },
};

export default repository;
