# Architecture
                 Next.js
                    │
        ┌───────────┴────────────┐
        │                        │
     Frontend                 API Layer
                                  │
                        ┌─────────┴─────────┐
                        │                   │
                    Services            Workers
                        │                   │
              ┌─────────┼────────┐         │
              │         │        │         │
             CRM      Research   AI      Email
              │         │        │         │
              └─────────┼────────┴─────────┘
                        │
                   PostgreSQL
                        │
                    pgvector