exports.hello = async (event) => {
  switch (event.httpMethod) {
		case 'DELETE':
			return deleteItem(event);
		case 'GET':
			return getItem(event);
		case 'POST':
			return saveItem(event);
		case 'PUT':
			return updateItem(event);
		default:
			return sendResponse(404, `Unsupported method "${event.httpMethod}"`);
	}
}

function getItem(event) {
  return {
    statusCode: 200,
    body: 'get works',
    headers: {}
  }
}


function saveItem(event) {
	return {
    statusCode: 200,
    body: 'post works',
    headers: {}
  }
}