import mongoose from "mongoose";

const ScrapSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  desc: {
    type: String,
    required: true
  },

  imgLink: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  siteName: {
    type: String,
    required: true
  }
});

const Scrap = mongoose.model('Scrap', ScrapSchema);

export default Scrap;