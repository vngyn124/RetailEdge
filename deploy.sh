#!/bin/bash

# Build the React app
echo "Building React application..."
npm run build

# Deploy to S3
echo "Deploying to S3..."
aws s3 sync dist/ s3://your-bucket-name

echo "Deployment complete!"
echo "Your website should be available at the S3 website endpoint" 