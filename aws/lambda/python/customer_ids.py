import boto3
from dynamodb_lib import *

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('customer_ids')


def add_customer_id(id):
	if get_customer_id(id):
		return False
	
	item_to_put = {
		'id': id
	}
	
	put_response = table.put_item(
		Item=item_to_put
	)

	raise_if_request_failed(put_response)

	return item_to_put


def get_customer_id(id):
	get_response = table.get_item(
		Key={
			'id': id
		}
	)

	raise_if_request_failed(get_response)

	return get_response['Item'] if 'Item' in get_response else None


def delete_customer_id(id):
	if not get_customer_id(id):
		return False
	
	delete_response = table.delete_item(
		Key={
			'id': id
		}
	)

	raise_if_request_failed(delete_response)

	return True
