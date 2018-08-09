#!/usr/bin/env node 
'use strict';

/*
NodeJS Mongo Driver docs and tutorial:
  https://mongodb.github.io/node-mongodb-native/
  http://mongodb.github.io/node-mongodb-native/3.1/tutorials/crud/
*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const moment = require('moment');

// Connection URL format:
// const url = 'mongodb://$[username]:$[password]@$[hostlist]/$[database]?authSource=$[authSource]';

// see https://devcenter.heroku.com/articles/mongolab
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'myCaddy';