const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createdTime: Date,
    approvedTime: Date,
    tags: [{
        tagContent: String
    }],
    postContents: [{
        title: String,
        content: String,
        image: String,
        imageDesc: String
    }],
    title: String,
    cover: String,
    authorId: String,
    location: {
        locationName: String,
        provinceCity: [String],
        gps: String,
        address: String
    },
    categories: [{
        name: String
    }],
    rating: [{
        userId: String,
        ratingNumber: Number,
        time: Date
    }],
    status: String,
    comments: [{
        userId: String,
        creationTime: Date,
        content: String,
        userLiked: [String],
        userDisliked: [String],
        replies: [this],
        status: String
    }],
    description: String,
    viewAmount: Number
});

const Post = model('Post', postSchema, 'Posts');

module.exports = {
    Post
}