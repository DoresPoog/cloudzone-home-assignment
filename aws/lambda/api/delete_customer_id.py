import logging
from api_lib import *
from customer_ids import delete_customer_id

logger = logging.getLogger()

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
        success = delete_customer_id(event['pathParameters']['id'])

        response_body = {
            'success': success
        }
        
        if not success:
            response_body['errors'] = ['id_does_not_exist']
    except Exception as e:
        logger.error('Failed to delete ID',
            extra={
                'error': repr(e)
            }
        )
        status_code = 500
        response_body = {
            'successs': False,
            'result': None,
            'errors': ['Failed to delete ID']
        }
    
    return api_proxy_response(status_code, response_body)