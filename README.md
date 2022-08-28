# Kcahtod

Codebase for Ellipsis-Goldman Sachs hackathon

AWS lambda is used to
1. Push customer records to queue to be deposited into S3 bucket
2. Pull customer records from S3 bucket to be passed into GS’s credit scoring model
3. Pull customer records from queue after being passed through GS credit scoring model
4. Pull credit scores from the private cloud



Tech stack used: AWS Lambda, S3 Bucket, Amazon EC2, Node.js, Amazon DynamoDB
