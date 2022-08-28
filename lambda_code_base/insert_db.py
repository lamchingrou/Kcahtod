import boto3
import json

def lambda_handler(event, context):
    sqs_client = boto3.client('sqs')
    response = sqs_client.receive_message(
        QueueUrl='https://sqs.ap-southeast-1.amazonaws.com/748377465114/retrieve-from-financial-cloud',
        AttributeNames=['All'],
        MaxNumberOfMessages=10)
    print(f"Number of messages received: {len(response.get('Messages', []))}")
    message = json.loads(response['Body'].read())
    print(message)