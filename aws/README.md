# AWS Architecture

[Architecture diagram in draw.io](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&target=blank&highlight=0000ff&layers=1&nav=1&title=CloudZone%20Home%20Assignment.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1mcz2JSAvQmMJKzFc-qkScpcbi738MHAA%26export%3Ddownload)

<br>

# API Testing

Included in the project is a [Postman Collection of test requests](lambda/api/tests/CloudZone%20Home%20Assignment.postman_collection.json) that together make up a thorough scenario.
Import it to Postman and make sure to add a variable named: `CUSTOMER_IDS_API_KEY` (preferrably to Global or the Vault to make it secret) with [the relevant API Key](https://il-central-1.console.aws.amazon.com/apigateway/main/api-keys/572sgfvql5?api=unselected&region=il-central-1) before running the tests.
*You should run the entire Collection as the tests depend on the result of each action*.

<br>

# API Structure

The API is RESTful, with a single resource: `/customer-ids`.

## Auth

All requests *MUST* include an 'X-Api-Key' header with [the relevant API Key](https://il-central-1.console.aws.amazon.com/apigateway/main/api-keys/572sgfvql5?api=unselected&region=il-central-1):
`{ "X-Api-Key": "8kYj2gf39dsf...." }`

## Available Routes

### POST /customer-ids

#### Request Body:
`{ "id": "string" }`

#### Example Request Body:
`{ "id": "123" }`

#### Example Reponse Body:
`{ "success": true, "result": { "id": "123" } }`

#### Validation - Response if the ID already exists:
`{ "success": false, "result": null, "errors": ['id_already_exists'] }`

<br>

### GET /customer-ids/{id}

#### Example Request:
`GET /customer-ids/123`

#### Example Reponse:
`{ "success": true, "result": { "id": "123" } }`

#### If ID doesn't exist (considered successful):
`{ "success": true, "result": null }`

`success` will only be "false" if there was a server error.

<br>

### DELETE /customer-ids/{id}

#### Example Request:
`DELETE /customer-ids/123`

#### Response if the ID existed and was deleted in this operation:
`{ "success": true }`

#### Response if the ID did not exist when trying to delete:
`{ "success": false, "errors": ['id_does_not_exist'] }`

<br><br>

# Step Function Executions

With non-existent customer ID -> Added to table:
![image](https://i.ibb.co/1t1zryFQ/Screenshot-2025-09-28-at-7-48-11.png)

Events View:
![image](https://i.ibb.co/xKH0x1D2/Screenshot-2025-09-28-at-7-48-29.png)

With existing customer ID -> Logged event:
![image](https://i.ibb.co/yFGCMrgG/Screenshot-2025-09-28-at-7-48-48.png)

Events View:
![image](https://i.ibb.co/yBVT2ZFj/Screenshot-2025-09-28-at-7-49-01.png)
