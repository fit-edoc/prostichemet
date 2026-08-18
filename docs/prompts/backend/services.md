# Services Coding Rules

**Context**: For generating business logic services.

- **Encapsulation**: Put complex logic here, NOT in the route handlers.
- **Dependency Injection**: Accept a db instance as an argument to allow for easier unit and integration testing without mocking the global DB connection.
