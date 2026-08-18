# Worker Jobs

## The Need for Workers
Because AI GTM research involves scraping, multiple API calls, and LLM inference, a single request can take minutes. Next.js serverless functions often time out after 10-60 seconds. We must offload this to asynchronous workers.

## Worker Architecture (Redis + BullMQ)
- **Queue System**: BullMQ powered by a Redis instance.
- **Worker Types**:
  1. esearch-worker: Handles domain extraction, web scraping, and AI analysis.
  2. email-worker: Handles the actual SMTP/Resend dispatch based on campaign schedules.
  3. eply-classifier-worker: Periodically checks IMAP/Webhooks for replies and runs the LLM to classify sentiment (Positive, Negative, Out of Office).

## Job Lifecycle
1. **Enqueue**: API route handler pushes a job to the queue and returns a jobId to the client.
2. **Process**: Worker picks up the job and begins execution. Updates progress (e.g., 25%, 50%).
3. **Completion**: Job completes, database is updated (e.g., leads inserted).
4. **Failure**: If a job fails, BullMQ retries using exponential backoff.

## Idempotency
All worker jobs must be idempotent. If a worker crashes halfway through processing 50 leads and restarts, it should not duplicate the leads or send duplicate emails. Use database constraints and transaction states to manage this.
