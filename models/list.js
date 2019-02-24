const Joi = require("joi");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  type: {
    type: String,
    required: true
  },
  subType: {
    type: String,
    required: false
  },
  text: {
    type: String,
    maxlength: 500
  },
  done: {
    type: Boolean,
    default: false
  }
});
// [this] this could possibly work above within the original schema
listSchema.add({ value: [listSchema] });

const List = mongoose.model("List", listSchema);

// function validateGenre(genre) {
//   const schema = {
//     name: Joi.string()
//       .min(5)
//       .max(50)
//       .required()
//   };

//   return Joi.validate(genre, schema);
// }

exports.listSchema = listSchema;
exports.List = List;
//exports.validate = validateGenre;
