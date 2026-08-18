# API Design

## 1. Architecture Style
The API will follow RESTful principles, implemented using Next.js Route Handlers (`app/api/...`). Server Actions will be used for simpler, direct client-to-server mutations within the Next.js app.

## 2. Base URL and Versioning
- **Internal API**: `/api/v1/`
- All endpoints must be versioned to allow future backward-compatible changes.

## 3. Standard Response Formats

### Success Response
`json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 120
  }
}
`

### Error Response
`json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested lead could not be found.",
    "details": []
  }
}
`

## 4. Authentication
- **User Authentication**: Handled via session cookies (Auth.js).
- **Service/API Authentication**: Should the need for external programmatic access arise, Bearer tokens (API Keys) will be used.

## 5. Endpoints Structure (Examples)

### Workspaces
- `GET /api/v1/workspaces`
- `POST /api/v1/workspaces`

### Research Projects
- `GET /api/v1/workspaces/:workspaceId/research-projects`
- `POST /api/v1/workspaces/:workspaceId/research-projects`

### Leads
- `GET /api/v1/workspaces/:workspaceId/leads`
- `PATCH /api/v1/workspaces/:workspaceId/leads/:leadId`

## 6. Rate Limiting
- Implement rate limiting (via Redis) to prevent abuse.
- Standard limits: 100 requests per minute per user.
- Background task triggers (like starting a huge campaign) should have stricter limits.

## 7. Pagination
- Use cursor-based pagination for high-volume endpoints (e.g., leads, emails).
- Use offset/limit pagination for low-volume administrative endpoints.
