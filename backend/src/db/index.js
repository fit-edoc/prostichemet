const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
require('dotenv').config();

const client = postgres({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "postrichment",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

const db = drizzle(client);

async function initDatabase() {
  try {
    await client`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        avatar_url TEXT,
        google_id TEXT UNIQUE,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS workspaces (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        owner_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS workspace_members (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        workspace_id INTEGER REFERENCES workspaces(id) NOT NULL,
        role TEXT NOT NULL DEFAULT 'owner',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS business_profiles (
        id SERIAL PRIMARY KEY,
        workspace_id INTEGER REFERENCES workspaces(id) NOT NULL,
        company_name TEXT NOT NULL,
        industry TEXT,
        value_proposition TEXT,
        product_description TEXT,
        target_audience TEXT,
        typical_customer TEXT,
        typical_deal_size TEXT,
        region TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS icp_profiles (
        id SERIAL PRIMARY KEY,
        workspace_id INTEGER REFERENCES workspaces(id) NOT NULL,
        business_profile_id INTEGER REFERENCES business_profiles(id) NOT NULL,
        title TEXT NOT NULL,
        target_industries JSONB,
        target_roles JSONB,
        company_size JSONB,
        pain_points JSONB,
        criteria JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id SERIAL PRIMARY KEY,
        workspace_id INTEGER REFERENCES workspaces(id),
        category TEXT DEFAULT 'general',
        title TEXT,
        content TEXT NOT NULL,
        metadata JSONB,
        embedding JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS crm_prospects (
        id SERIAL PRIMARY KEY,
        workspace_id INTEGER REFERENCES workspaces(id) NOT NULL,
        icp_profile_id INTEGER REFERENCES icp_profiles(id),
        company_name TEXT NOT NULL,
        owner_name TEXT,
        company_size TEXT,
        website_link TEXT,
        industry TEXT,
        location TEXT,
        contact_name TEXT,
        contact_title TEXT,
        contact_email TEXT,
        contact_linkedin TEXT,
        evidence JSONB,
        signals JSONB,
        status TEXT NOT NULL DEFAULT 'New',
        score INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        workspace_id INTEGER REFERENCES workspaces(id) NOT NULL,
        prospect_id INTEGER REFERENCES crm_prospects(id) NOT NULL,
        icp_profile_id INTEGER REFERENCES icp_profiles(id),
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        framework TEXT DEFAULT 'PAS',
        status TEXT NOT NULL DEFAULT 'Draft',
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS ai_runs (
        id SERIAL PRIMARY KEY,
        workspace_id INTEGER REFERENCES workspaces(id),
        agent_name TEXT NOT NULL,
        prompt_version TEXT DEFAULT 'v1.0',
        input_data JSONB,
        output_data JSONB,
        model TEXT DEFAULT 'gemini-2.5-flash',
        tokens_used INTEGER,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    console.log("✅ Database tables verified and initialized successfully.");
  } catch (error) {
    console.warn("⚠️ Database initialization warning:", error.message);
  }
}

module.exports = {
  db,
  client,
  initDatabase
};
