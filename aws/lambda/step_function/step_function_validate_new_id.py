import logging
import boto3

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('customer_ids')

def lambda_handler(event, context):
    id = event['body']['id']
    logging_extras = {
        'id': id
    }
    logger.info(f"Checking if id '{id}' exists...",
        extra=logging_extras
    )

    try:
        get_item_response = table.get_item(
            Key={
                'id': event['body']['id']
            }
        )

        if 'Item' in get_item_response:
            logging.info('ID found.',
                extra=logging_extras
            )
            
            return get_item_response['Item']

        logging.info('ID does not exist.',
            extra=logging_extras
        )

        return None
    except Exception as e:
        logger.error(f"Failed to get id from DB: {repr(e)}")
        raise
