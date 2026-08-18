# Project Context
# AI GTM Research & Outbound SaaS — Project Context

## 1. Product Overview

We are building a SaaS platform for startups, freelancers, consultants,
software agencies, marketing agencies, and other small businesses that need
qualified B2B leads.

The core product transforms a business description into:

Business context
→ Ideal Customer Profile
→ Market research
→ Company discovery
→ Contact discovery
→ Evidence collection
→ Lead qualification
→ Opportunity analysis
→ Personalized outreach
→ Campaign execution
→ Reply classification
→ CRM pipeline
→ Analytics
→ Learning

The product should behave like an AI sales/research assistant rather than
simply being another CRM or email sender.

---

## 2. Core Product Promise

The user should be able to describe:

- What they sell
- Who they currently sell to
- Target geography
- Typical customer size
- Typical deal size
- Industry
- Service/product
- Optional examples of existing customers

The system should transform this information into a structured ICP and
discover high-quality prospects.

For every recommended prospect, the system should explain:

1. Why this company matches the ICP
2. Why this company may need the user's product/service
3. Which business signals support the recommendation
4. Which person is the most relevant contact
5. What evidence supports the research
6. How confident the system is

---

## 3. Product Philosophy

The platform is research-first.

We do not want to optimize for:

- Maximum number of leads
- Maximum emails sent
- Maximum open rate

We optimize for:

- Lead quality
- Research accuracy
- Evidence quality
- Qualified replies
- Meetings
- Opportunities
- Revenue

---

## 4. Initial Target Customer

Primary target:

- Small software agencies
- AI agencies
- Web development agencies
- Marketing agencies
- SaaS startups
- Consultants
- Recruiting agencies

Typical company size:

1–20 employees.

The product should initially avoid trying to serve enterprise sales organizations.

---

## 5. Core Workflow

### Step 1

User creates a workspace.

### Step 2

User describes their business.

### Step 3

AI generates an initial ICP.

### Step 4

User reviews and modifies the ICP.

### Step 5

User starts research.

### Step 6

The research engine discovers candidate companies.

### Step 7

Companies are enriched and researched.

### Step 8

Relevant contacts are discovered.

### Step 9

AI evaluates fit, intent, contact relevance and data confidence.

### Step 10

The user reviews prospects.

### Step 11

User exports prospects or adds them to a campaign.

### Step 12

AI generates personalized outreach.

### Step 13

User approves the campaign.

### Step 14

The email system sends the campaign according to configured limits.

### Step 15

Replies are collected and classified.

### Step 16

The CRM pipeline is updated.

### Step 17

Analytics measure campaign and business outcomes.

### Step 18

Historical results improve future recommendations.

---

## 6. Core Principles

1. Never invent prospect information.
2. Never represent an unverified fact as verified.
3. Every important AI-generated research claim should have evidence.
4. Store source URLs and timestamps where possible.
5. Separate raw data from AI interpretation.
6. Keep AI outputs structured.
7. Validate all AI outputs.
8. Human approval is required before outbound campaigns.
9. Respect unsubscribe and suppression rules.
10. Do not optimize only for email volume.
11. Prefer fewer high-quality prospects over many poor prospects.
12. Every AI decision should be explainable.
13. All important AI operations should be observable.
14. AI failures should degrade gracefully.
15. The system must be multi-tenant from the beginning.

---

## 7. MVP Definition

MVP must include:

- Authentication
- Workspace
- Business profile
- ICP generation
- Research project
- Company discovery
- Company research
- Contact discovery
- Lead scoring
- Evidence
- Lead table
- CSV export
- AI email generation
- Campaign creation
- Email sending
- Reply collection
- Reply classification
- Basic CRM pipeline
- Campaign analytics

---

## 8. Explicitly Out of Scope for MVP

Do not build initially:

- LinkedIn automation
- WhatsApp automation
- SMS campaigns
- Voice calling
- Enterprise CRM functionality
- Large proprietary contact database
- Complex workflow builder
- Autonomous AI SDR
- Advanced revenue forecasting
- Dozens of integrations
- Mobile application

---

## 9. Product North Star

A user should be able to go from:

"I sell X to Y companies"

to:

"Here are the 50 highest-value companies I should contact,
here is why each one is relevant,
here is the right person,
here is the evidence,
and here is the recommended message."
