const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log("Jest Setup: MongoDB connected");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log("Jest Teardown: MongoDB disconnected");
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  console.log("Jest Setup: Database cleared after test");
});
