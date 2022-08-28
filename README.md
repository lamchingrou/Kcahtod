# Kcahtod

Codebase for Ellipsis-Goldman Sachs hackathon

AWS lambda is used to
1. Push customer records to queue to be deposited into S3 bucket
2. Pull customer records from S3 bucket to be passed into GS’s credit scoring model
3. Pull customer records from queue after being passed through GS credit scoring model
4. Pull credit scores from the private cloud

AWS S3 Bucket is used to
1. Store raw customer records from partner NBFCs
2. 2. Store cleaned customer records  

Nodejs is subscribed to the SQS. Customer records are pulled from the SQS to be processed in the backend, and then pushed an s3 bucket to await being sent to Goldman Sachs' end point.

Amazon DynamoDB is our database of choice to store the aggregated credit scores for users to pull.


Tech stack used: AWS Lambda, S3 Bucket, Amazon EC2, Node.js, Amazon DynamoDB

Pitch Deck: https://docs.google.com/presentation/d/1aPc9wU35ZEv7mMFp_rg-ahmA_vPMQ7e0oCtKeeUB9gg/edit#slide=id.g14875f0dfb4_0_3943


Pitch Video: https://drive.google.com/file/d/19ylvicMGRH6ELyp2a0brGsmBM7POgEYt/view?usp=sharing

