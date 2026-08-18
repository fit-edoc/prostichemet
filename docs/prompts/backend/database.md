# Database Coding Rules

**Context**: For generating Drizzle ORM code.

- **Schema**: Ensure all tenant tables have a workspaceId column.
- **Queries**: Always append .where(eq(table.workspaceId, currentWorkspaceId)) to prevent data leaks.
- **Vector Search**: Use pgvector operators (e.g., <->) for semantic searches over company descriptions.
