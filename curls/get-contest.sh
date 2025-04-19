#!/bin/bash

# Get a specific contest by ID
curl -X GET \
  http://localhost:3000/api/contests/123e4567-e89b-12d3-a456-426614174000 \
  -H 'Content-Type: application/json'
