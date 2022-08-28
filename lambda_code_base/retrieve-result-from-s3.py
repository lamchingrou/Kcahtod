import json
import urllib.parse
import boto3

print('Loading function')

s3 = boto3.client('s3')
sqs = boto3.client('sqs')
QueueUrl = 'https://sqs.ap-southeast-1.amazonaws.com/748377465114/retrieve-from-financial-cloud'


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        data = response['Body'].read()
        print(response)
        #print(lst)
        #j = json.loads(response['Body'].read().decode('utf-8'))
        #print("CONTENT TYPE: " + j)
        result = json.loads(data)
        lst =json.dumps(result['customers'])
        sqs.send_message(
            QueueUrl=QueueUrl,
            MessageBody=lst
        )
        return {
        'statusCode': 200,
        'body': json.dumps(lst)
        }
 

    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e