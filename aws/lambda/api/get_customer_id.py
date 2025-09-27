import logging
from api_lib import *
from customer_ids import get_customer_id

logger = logging.getLogger()

def lambda_handler(event, context):
    status_code = 200

    try:
        id_item = get_customer_id(event['pathParameters']['id'])

        response_body = {
            'success': True,
            'result': id_item
        }
    except Exception as e:
        logger.error('Failed to get ID',
            extra={
				'error': repr(e)
			}
        )
        status_code = 500
        response_body = {
            'success': False,
            'result': None,
            'errors': ['Failed to get ID.']
        }
    
    return api_proxy_response(status_code, response_body)