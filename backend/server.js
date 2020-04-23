const express = require('express');
const cors =require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/TestToDo"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const tasksRouter = require('./routes/tasks');
const prioritesRouter = require('./routes/priorities')
const difficultiesRouter = require('./routes/difficulties')
const sizesRouter = require('./routes/sizes')

app.use('/tasks', tasksRouter);
app.use('/priorities', prioritesRouter);
app.use('/difficulties', difficultiesRouter);
app.use('/sizes', sizesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});