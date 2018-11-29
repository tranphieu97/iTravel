const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: number, // auto generate
    createdTime: Date,
    approvedTime: Date,
    //tag: Array<String>,
    //postContents: Array<PostContent>,
    title: string,
    cover: string,
    authorId: number,
    location: Location,
    categories: string,
    rating: number,
    status: string,
    // comments: Array<Comment>,
    description: string
});

module.exports = mongoose.model('Post', postSchema);