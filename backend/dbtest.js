const postgres = require('postgres');
require('dotenv').config();

const client = postgres({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "postrichment",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

async function test() {
  try {
    const result = await client`SELECT 1 as connected`;
    console.log("Success:", result);
  } catch (e) {
    console.error("DB Error:", e.message);
  } finally {
    process.exit(0);
  }
}
test();
