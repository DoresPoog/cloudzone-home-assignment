import json

def api_proxy_response(status_code, response_body):
	return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Allow' : 'POST',
            'Access-Control-Allow-Methods' : 'POST',
            'Access-Control-Allow-Headers' : '*'
        },
        'body': json.dumps(response_body)
    }

def validate_input(request_body):
    errors = []
    
    if 'id' not in request_body:
        errors.append("missing 'id' in request body")

    return errors