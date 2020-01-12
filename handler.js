'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

exports.hello = async (event) => {
  switch (event.httpMethod) {
		case 'GET':
			return getItem(event);
		case 'POST':
			return saveItem(event);
		default:
			return sendResponse(404, `Unsupported method "${event.httpMethod}"`);
	}
}


exports.modelSearchService = async (event) => {
	  if(event.httpMethod === 'GET'){
		return getCarModel(event);
	  } else {
		return sendResponse(404, `Unsupported method "${event.httpMethod}"`);
	  }
  }

exports.priceRetrievalService = async function (event){
	return getCarPrice(event);
}


exports.optionsRetrievalService = async function(event){
	return getCarOptions(event);
}


function getCarOptions(event) {
	const itemId = event.pathParameters.itemId;
	return databaseManager.getItem(itemId).then(response => {
		console.log(response);
		return sendResponse(200, JSON.stringify(response.options));
	});
}

function getCarPrice(event) {
	const itemId = event.pathParameters.itemId;
	return databaseManager.getItem(itemId).then(response => {
		console.log(response);
		return sendResponse(200, JSON.stringify(response.price));
	});
}

function getCarModel(event) {
	const modelName = event.pathParameters.modelName;
	return databaseManager.getItem().then(response => {
		let item = null;
		response.Items.forEach(element => {
			if(element.name.toLowerCase() === modelName.toLowerCase()){
				item = element;
			}
		});
		return sendResponse(200, JSON.stringify(item));
	});
}


function getItem(event) {
	const itemId = event.pathParameters.itemId;
	  return databaseManager.getItem(itemId).then(response => {
		  console.log(response);

		  let item = null;
		  response.Items.forEach(element => {
			  if(element.name.toLowerCase() === itemId.toLowerCase()){
				  item = element;
			  }
		  });
		  
		  return sendResponse(200, JSON.stringify(item));
	  });
  }

//   function getItem(event) {
// 	const itemId = event.pathParameters.itemId;
// 	  return databaseManager.getItem(itemId).then(response => {
// 		  console.log(response);
		  
// 		  return sendResponse(200, JSON.stringify(response));
// 	  });
//   }
  
  function saveItem(event) {
	const item = JSON.parse(event.body);
	  item.itemId = uuidv1();
  
	  return databaseManager.saveItem(item).then(response => {
		  console.log(response);
		  return sendResponse(200, item.itemId);
	  });
  }
  

function sendResponse(statusCode, message) {
	const response = {
		statusCode: statusCode,
    body: JSON.stringify(message),
    headers: {}
	};
	return response
}
