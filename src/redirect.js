"use strict";

var AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context, callback) => {

  if(event.pathParameters == null) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 200,
        message: 'mt.ax short url service'
      })
    }
  }

  var shorturl = (event.pathParameters.shorturl);

  if(shorturl == null) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 200,
        message: 'Invalid shorturl'
      })
    }
  }

  var params = {
    TableName: 'mtax_' + process.env.env + '_shorturls',
    KeyConditionExpression: 'shorturl = :a',
    ExpressionAttributeValues: {
      ":a": shorturl
    }
  };
  
  async function getItem(){
    try {
      const data = await docClient.query(params).promise()
      return data
    } catch (err) {
      return err
    }
  }

  try {
    const data = await getItem()

    // If no data found from database
    if(data.Items.length == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          status: 404,
          message: 'Shorturl not found'
        })
      }
    }

    const destinationurl = JSON.stringify(data.Items[0].destinationurl).replace(/['"]+/g, '')

    console.log('Redirecting to ' + destinationurl)

    return { 
      statusCode: 301,
      body: JSON.stringify({
        status: 301,
        message: 'Redirecting to ' + destinationurl
      }),
      headers: {
        'Location': destinationurl
      }
    }
  }
  catch (err) {
    return { error: err }
  }
  
};
