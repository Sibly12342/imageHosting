
const MongoClient = require("mongodb").MongoClient;
const state = {
  db: null,
};

module.exports.connect = async function() {
  try {
    const url = "mongodb+srv://sibly26462:q3ttvYcVEpp70v1K@cluster0.4bfqwq7.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    state.db = client.db('machineTest');
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

module.exports.get = function() {
  return state.db;
};
