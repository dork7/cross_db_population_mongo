var mongoose = require("mongoose");
var assert = require("assert");

mongoose.set("debug", true);

var db1 = mongoose.createConnection("mongodb://localhost:27017/gh3639");
var db2 = mongoose.createConnection("mongodb://localhost:27017/gh3639_2");

var userSchema = mongoose.Schema({
  name: String,
  email: String,
});

var customerSchema = mongoose.Schema({
  name: { type: String },
  email: [String],
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

var User = db1.model("users", userSchema);
var Customer = db2.model("customers", customerSchema);

User.create({ name: "Val" }, function (error, user) {
  assert.ifError(error);
  Customer.create(
    { name: "Bacon", created_by: user._id },
    function (error, customer) {
      assert.ifError(error);
      test(customer._id);
    }
  );
});

function test(id) {
  Customer.findOne({ _id: id })
    .populate("created_by", "name email", User)
    .exec(function (error, customer) {
      assert.ifError(error);
      assert.equal(customer.created_by.name, "Val");
      console.log(customer);
      process.exit(0);
    });
}
