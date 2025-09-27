import os
import logging
import json
import boto3
from api_lib import *
from customer_ids import add_customer_id

logger = logging.getLogger()
eventbridge = boto3.client('events')

def lambda_handler(event, context):
	status_code = 200

	# API Gateway should always send a 'body' key, so assuming existence
	event_body = json.loads(event['body'])

	errors = validate_input(event_body)

	if errors:
		logger.info('Received bad request.')
		status_code = 400
		response_body = {
			'successs': False,
			'result': None,
			'errors': errors
		}
	else:
		send_eventbridge_event(event['body'])

	try:
		logger.info('Adding item to DB.')

		new_item = add_customer_id(event_body['id'])
		success = not not new_item

		response_body = {
			'success': success,
			'result': new_item if success else None
		}

		if success:
			logger.info('Successfully added ID.')
		else:
			logger.info('Id already exists - not adding.')
			response_body['errors'] = ['id_already_exists']
	except Exception as e:
		logger.error('Failed to add ID',
			extra={
			'error': repr(e)
			}
		)
		status_code = 500
		response_body = {
			'successs': False,
			'result': None,
			'errors': ['Failed to add ID']
		}

	return api_proxy_response(status_code, response_body)


def send_eventbridge_event(data):
	try:
		function_name = os.environ['AWS_LAMBDA_FUNCTION_NAME']

		eventbridge_event_data = {
			'Source': function_name,
			'DetailType': 'PutCustomerID',
			'Detail': data,
			'EventBusName': 'customer-ids'
		}

		logger.info('Triggering EventBridge event.',
			extra={
				'event_data': eventbridge_event_data
			}
		)

		eventbridge.put_events(
			Entries=[eventbridge_event_data]
		)
	except Exception as e:
		logger.error('Failed to send event to EventBridge.')
		# Don't raise so the ID can be added to the DB
