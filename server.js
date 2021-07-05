const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { collection } = require("./model/user.model");
const Users = require("./model/user.model");
const Orders = require("./model/orders.model");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/workcycle")
  .then(() => {
    console.log(`connected to db`);
  })
  .catch(
    (err) => {
      console.log(`error in connecting`);
    },
    { collection: "user=data" }
  );

app.get("/", (req, res, next) => {
  Users.find()
    .populate({ path: "order.serviceId", model: Orders })
    // .populate({
    //   path: "order.serviceId",
    //   // populate: {
    //   //   path: "packageId",
    //   // },
    // })
    .then((doc) => {
      res.send(doc);
    });

  // Users.find().then((doc) => {
  //   console.log(JSON.stringify(doc[0].order[0].packages[0].packageId));
  //   // var query = { serviceId :}
  //   Orders.findById(doc[0].order[0].serviceId).then((doc) => {
  //     console.log(doc);
  //   });
  //   res.send(doc);
  // });
});

// app.get("/orders", (req, res, next) => {
//   Orders.find()
//     .populate("order")
//     .then((doc) => {
//       res.send(doc);
//     });
// });

app.post("/populate", (req, res, next) => {
  const id = req.body.id;
  Users.find(id).then((doc) => {
    res.send(doc);
  });
});

app.post("/", async (req, res, next) => {
  //   const data = {
  //     title: req.body.title,
  //     content: req.body.content,
  //     author: req.body.author,
  //   };
  console.log("inside post");
  console.log(req.body);
  const user = await new Users(req.body).save();
  return res.json({ user });
});

app.post("/orders", async (req, res, next) => {
  //   const data = {
  //     title: req.body.title,
  //     content: req.body.content,
  //     author: req.body.author,
  //   };
  console.log("inside post");
  console.log(req.body);
  const user = await new Orders(req.body).save();
  return res.json({ user });
});

app.put("/", (req, res) => {
  let newUser = new Users(req);
  res.json("update not mature enough");
});

app.listen(3000);
