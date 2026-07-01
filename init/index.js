if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to DB");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69e9c51726604e96027f33f4", // 👈 paste your real user _id here
  }));
  await Listing.insertMany(initData.data);
  console.log("✅ Data initialized successfully!");
  mongoose.connection.close();
};

main()
  .then(() => initDB())
  .catch((err) => console.log(err));