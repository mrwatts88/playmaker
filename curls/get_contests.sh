#!/bin/bash

# Get non-completed contests with name filter
curl -X GET "http://localhost:3000/api/contests?filter=NBA"