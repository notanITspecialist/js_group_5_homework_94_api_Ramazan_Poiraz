const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    text: {
        type: String,
        required: function () {
            return this.image.length === 0;
        }
    },
    image: {
        type: String,
        required: function () {
            return this.text.length === 0;
        }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    tags: [String]
});

const User = mongoose.model('post', PostSchema);

module.exports = User;