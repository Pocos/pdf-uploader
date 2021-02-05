const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  userId: mongoose.Types.ObjectId,
  filename: String,
  mimetype: String,
  fileSize: Number,
  filePath: String,
  thumbnailPath: String,
  active: { type: Boolean, required: true, default: true },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

schema.set('toObject', { getters: true, virtuals: false });
schema.set('toJSON', { getters: true, virtuals: false });

module.exports = schema;
