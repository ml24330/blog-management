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

const Visitor = mongoose.model('Visitor', new mongoose.Schema({
    time: Date,
    location: String,
    entry: String
}))

const Image = mongoose.model('Image', new mongoose.Schema({
    slug: String,
    image: {
        data: Buffer,
        contentType: String
    }
}))

export {Post, Author, Visit, Visitor, Image}