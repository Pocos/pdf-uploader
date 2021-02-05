const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  // _id: mongoose.Types.ObjectId,
  name: String,
  age: Number,
  active: { type: Boolean, required: true, default: true },
});

schema.set('toObject', { getters: true, virtuals: false });
schema.set('toJSON', { getters: true, virtuals: false });

module.exports = schema;
