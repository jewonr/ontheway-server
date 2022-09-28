import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
  feeds: {
    type: [{
      title: {
        type: String,
        required: true
      },
    
      desc: {
        type: String,
        required: true
      },
    
      url: {
        type: String,
        required: true
      },
    
      imgLink: {
        type: String,
      },
    }],
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Feed = mongoose.model('Feed', FeedSchema);
export default Feed;