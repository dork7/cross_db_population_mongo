const express = require("express");
const app = express();
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var db2 = mongoose.createConnection(
  "mongodb+srv://dork7:hitler564@mcluster.7kxtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

var orderSchema = new Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
  },
  {
    // timestamps: true,
  }
);
const Orders = db2.model("orders", orderSchema);
module.exports = Orders; // = db2.model("orders", orderSchema);

// module.exports = mongoose.model("orders", orderSchema);
