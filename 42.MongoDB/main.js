import mongoose from  "mongoose";
import express from "express";
import {Todo} from "    ./Models/Todo.js"

let conn  = await mongoose.connect("mongodb://localhost:27017/")

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const todo = new Todo({title : "GYM" ,desc:"GO to gym",isDone:false })
    todo.save();
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})