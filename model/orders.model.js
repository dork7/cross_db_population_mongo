const express = require("express");
const app = express();
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var db2 = mongoose.createConnection(
  "mongodb+srv://dork7:hitler564@mcluster.7kxtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const packages = [
  {
    packageId: mongoose.Schema.Types.ObjectId,
    name: String,
  },
];

var orderSchema = new Schema(
  {
    name: {
      type: String,
    },
    packages,
  },
  {
    // timestamps: true,
  }
);
const Orders = db2.model("orders", orderSchema);
module.exports = Orders; // = db2.model("orders", orderSchema);

// module.exports = mongoose.model("orders", orderSchema);
