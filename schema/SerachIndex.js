import mongoose from "mongoose";

const SearchIndexSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: true,
    default: 0,
  }
});

const SerachIndex = mongoose.model('SearchIndex', SearchIndexSchema);

export default SerachIndex;