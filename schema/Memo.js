import mongoose from "mongoose";

const MemoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },

  text: {
    type: String,
  },

  view: {
    type: Boolean,
    required: true
  },

  date: {
    type: String,
    required: true
  }
  
});

const Memo = mongoose.model('Memo', MemoSchema);

export default Memo;