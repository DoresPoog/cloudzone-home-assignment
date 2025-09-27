import logging
import boto3
from lib import *

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('customer_ids')

def lambda_handler(event, context):
    status_code = 200

    errors = validate_input(event['pathParameters'])

    if errors:
        logger.info('Received bad request.')
        status_code = 400
        response_body = {
            'successs': False,
            'result': None,
            'errors': errors
        }

    try:
        delete_response = table.delete_item(
            Key={
                'id': event['pathParameters']['id']
            }
        )

        put_response_metadata = delete_response['ResponseMetadata']
        put_status_code = put_response_metadata['HTTPStatusCode']
        success = put_status_code == 200

        response_body = {
            'success': success
        }
    except KeyError:
        status_code = 400
        response_body = {
            'success': False,
            'errors': ['bad request']
        }
    
    return api_response(status_code, response_body)