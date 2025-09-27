def raise_if_request_failed(response):
	response_metadata = response['ResponseMetadata']

	if not response_metadata['HTTPStatusCode'] == 200:
		raise Exception(f"Request to DB failed: {response_metadata['HTTPStatusCode']} - {response_metadata['HTTPStatusText']}")