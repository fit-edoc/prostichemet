# Rag System
Do not use RAG everywhere.

Use RAG where retrieval improves factual grounding.

Store
company pages
public company information
research results
extracted facts
signals
user business profile
ICP
historical campaign results
Don't embed everything

Structured facts should remain structured.

For example:

company.employee_count = 42

should not exist only as:

"Acme currently has approximately 42 employees."

Use vectors for semantic retrieval.

Use PostgreSQL columns for structured filtering.
