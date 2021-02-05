const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  userId: mongoose.Types.ObjectId,
  filename: String,
  mimetype: String,
  filePath: String,
  thumbnailPath: String,
  active: { type: Boolean, required: true, default: true },
});

schema.set('toObject', { getters: true, virtuals: false });
schema.set('toJSON', { getters: true, virtuals: false });

module.exports = schema;
