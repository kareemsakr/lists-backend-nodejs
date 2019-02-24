const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { List, validate } = require("../models/list");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const lists = await List.find()
    .select("-__v")
    .sort("user");
  res.send(lists);
});

router.post("/", auth, async (req, res) => {
  //TODO implement validate
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  let list = new List({
    user: req.body.user,
    type: req.body.type,
    subType: req.body.subType,
    text: req.body.text,
    done: req.body.done,
    value: req.body.value
  });
  list = await list.save();

  res.send(list);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  const list = await List.findOneAndUpdate(
    { user: req.body.user },
    {
      user: req.body.user,
      type: req.body.type,
      subType: req.body.subType,
      text: req.body.text,
      done: req.body.done,
      value: req.body.value
    },
    {
      new: true
    }
  );

  if (!list)
    return res.status(404).send("The list with the given ID was not found.");

  res.send(list);
});

// router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

router.get("/:id", validateObjectId, async (req, res) => {
  let list = await List.findOne({ user: req.params.id }).select("-__v");

  if (!list) {
    list = new List({
      user: req.params.id,
      type: "list",
      subType: "main_list",
      text: "Main list",
      done: false,
      value: []
    });
    list = await list.save();
  }

  res.send(list);
});

module.exports = router;
