import logging
import boto3

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('customer_ids')

def lambda_handler(event, context):
    item_to_put = event['body']
    logger.info(f"Adding ID '{item_to_put['id']}'...")
    
    try:
        put_response = table.put_item(
            Item=item_to_put
        )

        response_metadata = put_response['ResponseMetadata']
        statusCode = response_metadata['HTTPStatusCode']

        if statusCode == 200:
            logger.info('ID added successfully.')
        else:
            statusText = response_metadata['HTTPStatusText']
            logger.error(f"Failed to add ID: {statusCode} - {statusText}")

    except Exception as e:
        logger.error(f"Failed to add ID: {repr(e)}")
        raise
