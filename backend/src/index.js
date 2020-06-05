const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { dbUserName, dbPassword, dbName } = require('../config');

const app = express();

mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@cluster0-rim1z.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);