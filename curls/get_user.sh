#!/bin/bash

# Replace USER_ID with an actual UUID from a created user
USER_ID="00000000-0000-0000-0000-000000000000"

curl -X GET http://localhost:3000/api/users/${USER_ID} 