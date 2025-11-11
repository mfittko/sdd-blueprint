# API Documentation

## Endpoints

### GET /api/example

Returns example data.

**Response:**
```json
{
  "data": "example"
}
```

### POST /api/example

Creates a new example.

**Request:**
```json
{
  "name": "example"
}
```

**Response:**
```json
{
  "id": "123",
  "name": "example"
}
```

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message"
}
```

Status codes:
- `200` - Success
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error
