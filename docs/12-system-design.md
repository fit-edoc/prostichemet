# System Design

## 1. High-Level Overview

The system is a multi-tenant SaaS platform that helps B2B companies find qualified leads and run outbound email campaigns.
It combines research, AI, email automation, CRM, and analytics into a single workflow.

## 2. Core Principles

- Multi-tenant from the start
- Research-first approach
- Evidence-backed AI decisions
- Human-in-the-loop approval for outbound
- Feedback loops between sales results and research

## 3. System Components

```
Client (Next.js Frontend)
  │
  ▼
API Gateway / Backend (Next.js Route Handlers)
  ├─ Auth Service
  ├─ Workspace Service
  ├─ ICP Service
  ├─ Research Service
  ├─ CRM Service
  ├─ Email Service
  └─ Analytics Service

Background Workers
  ├─ Research Worker
  ├─ Email Worker
  └─ Reply Classifier

External Services
  ├─ AI Provider (Gemini)
  ├─ Research Providers (LLMs, search APIs)
  ├─ Enrichment Providers (domain, company, contact APIs)
  ├─ Email Provider (Resend, SMTP)
  └─ Storage (S3-compatible for attachments, logs)

Data Layer
  ├─ PostgreSQL (Relational data, vector embeddings)
  ├─ Redis (Queue, cache, rate limiting)
```

---

## 4. Database Schema

### Primary Tables

**Workspaces**
```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**BusinessProfiles**
```sql
CREATE TABLE business_profiles (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  description TEXT,
  industry VARCHAR(100),
  target_audience TEXT,
  typical_customer TEXT,
  typical_deal_size TEXT,
  region VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**ICPs**
```sql
CREATE TABLE icps (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  criteria JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**ResearchProjects**
```sql
CREATE TABLE research_projects (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  icp_id UUID REFERENCES icps(id),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'RUNNING',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Companies**
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  domain VARCHAR(255),
  name VARCHAR(255),
  linkedin_url TEXT,
  description TEXT,
  industry VARCHAR(100),
  size VARCHAR(50),
  location VARCHAR(100),
  research_project_id UUID REFERENCES research_projects(id),
  status VARCHAR(50) DEFAULT 'NEW',
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  vector_embedding vector(1536)
);
```

**Contacts**
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  linkedin_url TEXT,
  title VARCHAR(255),
  role VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Evidence**
```sql
CREATE TABLE evidence (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  contact_id UUID REFERENCES contacts(id),
  type VARCHAR(50),
  url TEXT,
  content TEXT,
  raw_data JSONB,
  created_at TIMESTAMP
);
```

**ResearchSignals**
```sql
CREATE TABLE research_signals (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  contact_id UUID REFERENCES contacts(id),
  type VARCHAR(50),
  weight FLOAT,
  details JSONB,
  created_at TIMESTAMP
);
```

**Leads**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  contact_id UUID REFERENCES contacts(id),
  research_project_id UUID REFERENCES research_projects(id),
  workspace_id UUID REFERENCES workspaces(id),
  score FLOAT,
  status VARCHAR(50) DEFAULT 'NEW',
  campaign_id UUID REFERENCES campaigns(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Campaigns**
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  name VARCHAR(255) NOT NULL,
  icp_id UUID REFERENCES icps(id),
  status VARCHAR(50) DEFAULT 'DRAFT',
  emails_sent INTEGER DEFAULT 0,
  replies_received INTEGER DEFAULT 0,
  positive_replies INTEGER DEFAULT 0,
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Emails**
```sql
CREATE TABLE emails (
  id UUID PRIMARY KEY,
  campaign_id UUID REFERENCES campaigns(id),
  lead_id UUID REFERENCES leads(id),
  status VARCHAR(50) DEFAULT 'SENT',
  subject TEXT,
  body TEXT,
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  replied_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Replies**
```sql
CREATE TABLE replies (
  id UUID PRIMARY KEY,
  email_id UUID REFERENCES emails(id),
  workspace_id UUID REFERENCES workspaces(id),
  contact_id UUID REFERENCES contacts(id),
  content TEXT,
  sentiment VARCHAR(50),
  type VARCHAR(50) DEFAULT 'POSITIVE',
  action_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP
);
```

**Notes**
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  lead_id UUID REFERENCES leads(id),
  note_type VARCHAR(50),
  content TEXT,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Appointments**
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  workspace_id UUID REFERENCES workspaces(id),
  lead_id UUID REFERENCES leads(id),
  contact_id UUID REFERENCES contacts(id),
  campaign_id UUID REFERENCES campaigns(id),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  status VARCHAR(50) DEFAULT 'SCHEDULED',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 5. Entity Relationship Diagram

```
+------------+        +----------------+        +---------------+        +----------------+
|  Workspaces  |        | BusinessProfiles |        |      ICPs     |        | ResearchProjects |
|--------------|        |----------------|        |---------------|        |----------------|
| id           |<>------| id             |<>------| id            |<>------| id             |
| user_id      |        | workspace_id   |        | workspace_id  |        | workspace_id   |
| name         |        | ...            |        | name          |        | icp_id         |
| ...          |        +----------------+        +---------------+        | ...            |
+------------+                                                         +----------------+
    │                                                                               │
    │                                                                               ▼
    │                                                                         +-------------+
    │                                                                         |  Companies    |
    │                                                                         |-------------|
    │                                                                         | id          |<>-------+------------+
    │                                                                         | research_
