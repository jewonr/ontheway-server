import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },

  text: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;