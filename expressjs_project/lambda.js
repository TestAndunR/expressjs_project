let AWS = require('aws-sdk');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    app.use(bodyParser.json({ strict: false }));
    app.post('/users', function (req, res) {
        const { userId, name} = req.body;
        if (typeof userId !== 'string') {
            res.status(400).json({ error: '"userId" must be a string' });
        } else if (typeof name !== 'string') {
            res.status(400).json({ error: '"name" must be a string' });
        };
        
        dynamoDb.put({
            TableName: 'users-dbtable-dev',
            Item: { 'userId': userId, 'name': name }
        }).promise().then(function (data) {
            conso
            //your logic goes here
            res.json({ "message": "success"});
        }).catch(function (err) {
            res.status(404).json({ error: "User not found" });
            //handle error
        });
    })
    callback(null, { "message": "Successfully executed" });
}