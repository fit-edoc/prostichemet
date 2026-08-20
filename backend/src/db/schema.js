const { pgTable, serial, text, timestamp, integer, jsonb, doublePrecision } = require('drizzle-orm/pg-core');

// 1. Users Table
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  googleId: text('google_id').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Workspaces Table
const workspaces = pgTable('workspaces', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: integer('owner_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 3. Workspace Members Table
const workspaceMembers = pgTable('workspace_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  workspaceId: integer('workspace_id').references(() => workspaces.id).notNull(),
  role: text('role').notNull().default('owner'), // 'owner', 'admin', 'member'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Business Profiles Table
const businessProfiles = pgTable('business_profiles', {
  id: serial('id').primaryKey(),
  workspaceId: integer('workspace_id').references(() => workspaces.id).notNull(),
  companyName: text('company_name').notNull(),
  industry: text('industry'),
  valueProposition: text('value_proposition'),
  productDescription: text('product_description'),
  targetAudience: text('target_audience'),
  typicalCustomer: text('typical_customer'),
  typicalDealSize: text('typical_deal_size'),
  region: text('region'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 5. ICP Profiles Table
const icpProfiles = pgTable('icp_profiles', {
  id: serial('id').primaryKey(),
  workspaceId: integer('workspace_id').references(() => workspaces.id).notNull(),
  businessProfileId: integer('business_profile_id').references(() => businessProfiles.id).notNull(),
  title: text('title').notNull(),
  targetIndustries: jsonb('target_industries'),
  targetRoles: jsonb('target_roles'),
  companySize: jsonb('company_size'),
  painPoints: jsonb('pain_points'),
  criteria: jsonb('criteria'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 6. Knowledge Base Table (For RAG vector & semantic retrieval)
const knowledgeBase = pgTable('knowledge_base', {
  id: serial('id').primaryKey(),
  workspaceId: integer('workspace_id').references(() => workspaces.id),
  category: text('category').default('general'), // 'industry', 'framework', 'objection', 'winning_emails'
  title: text('title'),
  content: text('content').notNull(),
  metadata: jsonb('metadata'),
  embedding: jsonb('embedding'), // Array of floats
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 7. Scored Prospects / CRM Table
const crmProspects = pgTable('crm_prospects', {
  id: serial('id').primaryKey(),
  workspaceId: integer('workspace_id').references(() => workspaces.id).notNull(),
  icpProfileId: integer('icp_profile_id').references(() => icpProfiles.id).notNull(),
  companyName: text('company_name').notNull(),
  ownerName: text('owner_name'),
  companySize: text('company_size'),
  websiteLink: text('website_link'),
  industry: text('industry'),
  location: text('location'),
  contactName: text('contact_name'),
  contactTitle: text('contact_title'),
  contactEmail: text('contact_email'),
  contactLinkedin: text('contact_linkedin'),
  evidence: jsonb('evidence'), // Quotes, signals, reasons
  signals: jsonb('signals'),   // Growth signals (funding, hiring, tech stack)
  status: text('status').notNull().default('New'), // 'New', 'Contacted', 'Qualified', 'Meeting Booked', 'Replied', 'Unresponsive'
  score: integer('score').default(0), // Fit & Intent score (0-100)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 8. Generated Cold Outreach Emails Table
const emails = pgTable('emails', {
  id: serial('id').primaryKey(),
  workspaceId: integer('workspace_id').references(() => workspaces.id).notNull(),
  prospectId: integer('prospect_id').references(() => crmProspects.id).notNull(),
  icpProfileId: integer('icp_profile_id').references(() => icpProfiles.id),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  framework: text('framework').default('PAS'), // 'PAS' (Problem-Agitate-Solve), 'Observation-Insight-Value', 'Case-Study'
  status: text('status').notNull().default('Draft'), // 'Draft', 'Approved', 'Sent', 'Replied'
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 9. AI Agent Runs & Observability Logs Table (Docs requirement 26 & 43)
const aiRuns = pgTable('ai_runs', {
  id: serial('id').primaryKey(),
  workspaceId: integer('workspace_id').references(() => workspaces.id),
  agentName: text('agent_name').notNull(), // 'ICP Agent', 'Research Agent', 'Signal Detector', 'Email Generator'
  promptVersion: text('prompt_version').default('v1.0'),
  inputData: jsonb('input_data'),
  outputData: jsonb('output_data'),
  model: text('model').default('gemini-2.5-flash'),
  tokensUsed: integer('tokens_used'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

module.exports = {
  users,
  workspaces,
  workspaceMembers,
  businessProfiles,
  icpProfiles,
  knowledgeBase,
  crmProspects,
  emails,
  aiRuns,
};
