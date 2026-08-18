import { pgTable, uuid, varchar, text, timestamp, jsonb, boolean, integer, doublePrecision } from "drizzle-orm/pg-core";
import { customType } from 'drizzle-orm/pg-core';

// Vector type for pgvector
const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return 'vector(1536)';
  },
  toDriver(value: number[]): string {
    return JSON.stringify(value);
  },
  fromDriver(value: string): number[] {
    return JSON.parse(value);
  },
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const businessProfiles = pgTable("business_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  description: text("description"),
  industry: varchar("industry", { length: 100 }),
  targetAudience: text("target_audience"),
  typicalCustomer: text("typical_customer"),
  typicalDealSize: text("typical_deal_size"),
  region: varchar("region", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const icps = pgTable("icps", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  criteria: jsonb("criteria"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const researchProjects = pgTable("research_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  icpId: uuid("icp_id").references(() => icps.id),
  name: varchar("name", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default('RUNNING'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  domain: varchar("domain", { length: 255 }),
  name: varchar("name", { length: 255 }),
  linkedinUrl: text("linkedin_url"),
  description: text("description"),
  industry: varchar("industry", { length: 100 }),
  size: varchar("size", { length: 50 }),
  location: varchar("location", { length: 100 }),
  researchProjectId: uuid("research_project_id").references(() => researchProjects.id),
  status: varchar("status", { length: 50 }).default('NEW'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  vectorEmbedding: vector("vector_embedding"),
});

export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }),
  linkedinUrl: text("linkedin_url"),
  title: varchar("title", { length: 255 }),
  role: varchar("role", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const evidence = pgTable("evidence", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id),
  contactId: uuid("contact_id").references(() => contacts.id),
  type: varchar("type", { length: 50 }),
  url: text("url"),
  content: text("content"),
  rawData: jsonb("raw_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const researchSignals = pgTable("research_signals", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id),
  contactId: uuid("contact_id").references(() => contacts.id),
  type: varchar("type", { length: 50 }),
  weight: doublePrecision("weight"),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  name: varchar("name", { length: 255 }).notNull(),
  icpId: uuid("icp_id").references(() => icps.id),
  status: varchar("status", { length: 50 }).default('DRAFT'),
  emailsSent: integer("emails_sent").default(0),
  repliesReceived: integer("replies_received").default(0),
  positiveReplies: integer("positive_replies").default(0),
  scheduledAt: timestamp("scheduled_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id),
  contactId: uuid("contact_id").references(() => contacts.id),
  researchProjectId: uuid("research_project_id").references(() => researchProjects.id),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  score: doublePrecision("score"),
  status: varchar("status", { length: 50 }).default('NEW'),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const emails = pgTable("emails", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  leadId: uuid("lead_id").references(() => leads.id),
  status: varchar("status", { length: 50 }).default('SENT'),
  subject: text("subject"),
  body: text("body"),
  sentAt: timestamp("sent_at"),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
  repliedAt: timestamp("replied_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailId: uuid("email_id").references(() => emails.id),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  contactId: uuid("contact_id").references(() => contacts.id),
  content: text("content"),
  sentiment: varchar("sentiment", { length: 50 }),
  type: varchar("type", { length: 50 }).default('POSITIVE'),
  actionRequired: boolean("action_required").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  leadId: uuid("lead_id").references(() => leads.id),
  noteType: varchar("note_type", { length: 50 }),
  content: text("content"),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id),
  leadId: uuid("lead_id").references(() => leads.id),
  contactId: uuid("contact_id").references(() => contacts.id),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  status: varchar("status", { length: 50 }).default('SCHEDULED'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
