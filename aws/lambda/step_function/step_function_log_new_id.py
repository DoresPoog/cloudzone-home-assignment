import logging

logger = logging.getLogger()

def lambda_handler(event, context):
    logger.info('Customer ID added successfully.',
        extra={
            'id': event['body']['id']
        }
    )
