const levelup = require('levelup');
const { DynamoDB } = require('aws-sdk');
const { DynamoDbDown } = require('dynamodbdown');

// https://www.npmjs.com/package/dynamodb-leveldown
const factory = DynamoDbDown(new DynamoDB({}));
const db = levelup(factory('pouchdb'));

const PouchDB = require('pouchdb');
var CustomPouchDB = PouchDB.defaults({db: db});

const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use('/', require('express-pouchdb')(CustomPouchDB));

exports.pouchdbServerlessHandler = serverless(app, {
    request(request, event, context) {
        console.log(request, event, context);
    },
    async response(response, event, context) {
        console.log(response, event, context);
    }
});