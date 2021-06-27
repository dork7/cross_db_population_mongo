const express = require("express");
const app = express();
const mongoose = require("mongoose");
const orders = require("./orders.model.js");

var Schema = mongoose.Schema;
var db1 = mongoose.createConnection("mongodb://localhost/workcycle");

var userSchema = new Schema(
  {
    title: String,
    content: String,
    author: String,
    order: {
      type: Schema.Types.ObjectId,
      ref: orders,
    },
  },
  {
    // timestamps: true,
  }
);
// module.exports = mongoose.model("UserData", userSchema);
const Users = db1.model("UserData", userSchema);
module.exports = Users;
