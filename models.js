import mongoose from 'mongoose'

const Post = mongoose.model('Post', new mongoose.Schema({
    slug: String,
    title: String,
    author: String,
    authors: [String],
    date: Date,
    categories: [String],
    content: String
}))

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    category: String,
    image: {
        data: Buffer,
        contentType: String
    }
}))

const Visit = mongoose.model('Visit', new mongoose.Schema({
    id: String,
    visits: Number
}))

export {Post, Author, Visit}