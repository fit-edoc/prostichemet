const postgres = require('postgres');
require('dotenv').config();

// Connect to the default 'postgres' database to issue the CREATE DATABASE command
const client = postgres({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: "postgres", // Connecting to default database
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

async function createDb() {
  try {
    console.log("Attempting to create database 'postrichment'...");
    await client`CREATE DATABASE postrichment`;
    console.log("✅ Database 'postrichment' created successfully!");
  } catch (err) {
    if (err.message.includes('already exists')) {
      console.log("Database already exists.");
    } else {
      console.error("Error creating database:", err.message);
    }
  } finally {
    process.exit(0);
  }
}

createDb();
