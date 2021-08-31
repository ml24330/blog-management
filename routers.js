import express from 'express'
import dotenv from 'dotenv'
import sw from 'stopword'
import multer from 'multer'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { Post, Author, Visit, Visitor, Image } from './models.js'

dotenv.config()

const postsRouter = express.Router()
const postRouter = express.Router()
const authorsRouter = express.Router()
const visitsRouter = express.Router()
const imagesRouter = express.Router()

/*
    Set up multer
*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage })

const slugify = (string) => {
    return sw.removeStopwords(string.split(' ')).join(' ').toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/*
    The /posts router
*/

// CREATE one new post
postsRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, author, authors, categories, content, date } = req.body
        if(!title || !categories || !content || !date || (!author && !authors)) {
            throw new Error('Missing fields!')
        }
        const slug = slugify(title)
        let post
        if(req.file) {
            const image = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
            post = new Post({
                slug,
                title,
                author,
                authors,
                categories,
                content,
                date,
                image
            })
        } else {
            post = new Post({
                slug,
                title,
                author,
                authors,
                categories,
                content,
                date
            })
        }
        await post.save()
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        return res.json(post)
    } catch(e) {
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        console.log(`Error while creating new post: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

// READ all posts
postsRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        return res.json(posts)
    } catch(e) {
        console.log(`Error while indexing posts: ${e}`)
        return res.status(404).json('An error has occurred!')
    }
})

// READ posts containing search query
postsRouter.get('/search/:query(*)', async (req, res) => {
    const query = req.params.query.replace(/[^\w\s]/gi, '')
    try {
        if(!query) {
            throw new Error('Invalid query string!')
        }
        const posts = await Post.find({ $or: [
            { title: { '$regex': query, '$options': 'i' } },
            { author: { '$regex': query, '$options': 'i' } },
            { authors: { '$regex': query, '$options': 'i' } },
            { categories: { '$regex': query, '$options': 'i' } },
            { content: { '$regex': query, '$options': 'i' } },
            { title: { '$regex': query, '$options': 'i' } }
        ] })
        return res.json(posts)
    } catch(e) {
        console.log(`Error while searching posts using query ${req.params.query}: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

// READ posts by category
postsRouter.get('/:category', async (req, res) => {
    try {
        const posts = await Post.find({ categories: req.params.category })
        if(posts.length === 0) {
            throw new Error('No posts found!')
        }
        return res.json(posts)
    } catch(e) {
        console.log(`Error while indexing posts by category: ${e}`)
        return res.status(404).json('An error has occurred!')
    }
})

// UPDATE one post
postsRouter.patch('/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, author, authors, categories, content, date } = req.body
        if(!title || !categories || !content || !date || (!author && !authors)) {
            throw new Error('Missing fields!')
        }
        let post
        if(req.file) {
            const image = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
            post = {
                title,
                author,
                authors: authors || [],
                categories,
                content,
                date,
                image
            }
        } else {
            post = {
                title,
                author,
                authors: authors || [],
                categories,
                content,
                date
            }
        }
        const doc = await Post.findOneAndUpdate({ _id: req.params.id }, post, { new: true })
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        return res.json(doc)
    } catch(e) {
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        console.log(`Error while updating post: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

// DELETE one post
postsRouter.delete('/:id', async (req, res) => {
    try {
        await Post.findOneAndDelete({ _id: req.params.id })
        return res.status(204).send()
    } catch(e) {
        console.log(`Error while deleting post: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})


/*
    The /post router
*/

// READ one post by ID
postRouter.get('/id/:id', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if(!post) {
            throw new Error('No documents found!')
        }
        res.json(post)
    } catch(e) {
        console.log(`Error while indexing post: ${e}`)
        return res.status(404).json('An error has occurred!')
    } 
})


// READ one post by slug
postRouter.get('/slug/:slug', async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
        if(!post) {
            throw new Error('No documents found!')
        }
        res.json(post)
    } catch(e) {
        console.log(`Error while indexing post: ${e}`)
        return res.status(404).json('An error has occurred!')
    } 
})


/*
    The /authors router
*/

// CREATE one new author
authorsRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, bio, category } = req.body
        if(!name || !bio || !category) {
            throw new Error('Missing fields!')
        }
        let author
        if(req.file) {
            const image = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
            author = new Author({
                name,
                bio,
                category,
                image
            })
        } else {
            author = new Author({
                name,
                bio,
                category
            })
        }
        await author.save()
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        return res.json(author)
    } catch(e) {
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        console.log(`Error while creating new author: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

// READ all authors
authorsRouter.get('/', async (req, res) => {
    try {
        const authors = await Author.find()
        res.json(authors)
    } catch(e) {
        console.log(`Error while indexing authors: ${e}`)
        return res.status(404).json('An error has occurred!')
    }    
})

// READ one author
authorsRouter.get('/:id', async (req, res) => {
    let author

    try {
        author = await Author.findOne({ _id: req.params.id })
        if(!author) {
            throw new Error('No documents found!')
        }
    } catch(e) {
        console.log(`Error while indexing author: ${e}`)
        return res.status(404).json('An error has occurred!')
    }

    let posts = []

    try {
        posts = await Post.find({ $or:[{author: req.params.name},{authors: req.params.name}] })
        if(!posts) {
            throw new Error('No documents found!')
        }
    } catch(e) {
        console.log(`Error while indexing posts: ${e}`)
        return res.status(404).json('An error has occurred!')
    }

    res.json({...JSON.parse(JSON.stringify(author)), posts})
})

// UPDATE one author
authorsRouter.patch('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, bio, category } = req.body
        if(!name || !bio || !category) {
            throw new Error('Missing fields!')
        }
        let author
        if(req.file) {
            const image = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
            author = {
                name,
                bio,
                category,
                image
            }
        } else if(req.body.image === 'null') {
            author = {
                name,
                bio,
                category,
                image: {
                    contentType: 'image/png'
                }
            }
        } else {
            author = {
                name,
                bio,
                category
            }
        }
        const doc = await Author.findOneAndUpdate({ _id: req.params.id }, author, { new: true })
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        return res.json(doc)
    } catch(e) {
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        console.log(`Error while updating author: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

// DELETE one author
authorsRouter.delete('/:id', async (req, res) => {
    try {
        await Author.findOneAndDelete({ _id: req.params.id })
        return res.status(204).send()
    } catch(e) {
        console.log(`Error while deleting author: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})


/*
    The /visits router
*/

// CREATE one new visit ID
visitsRouter.post('/:id', async (req, res) => {
    const visit = new Visit({
        id: req.params.id,
        visits: 0
    })
    try {
        const find = await Visit.findOne({ id: req.params.id })
        if(find) {
            throw new Error(`Item with id ${req.params.id} already exists!`)
        }
        const doc = await visit.save()
        return res.json(doc)
    } catch(e) {
        console.log(`Error while saving visit: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

// READ all visits data
visitsRouter.get('/', async (req, res) => {
    try {
        const visits = await Visit.find()
        res.json(visits)
    } catch(e) {
        console.log(`Error while indexing visits: ${e}`)
        return res.status(404).json('An error has occurred!')
    }
})

visitsRouter.get('/visitors', async (req, res) => {
    try {
        if(req.query.pw !== process.env.DB_PASSWORD) throw new Error('Invalid password!')
        const visitors = await Visitor.find({})
        return res.json(visitors)
    } catch(e) {
        console.log(`Error while indexing visitors: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

// READ one visit data by ID
visitsRouter.get('/:id', async (req, res) => {
    try {
        const visit = await Visit.findOne({ id: req.params.id })
        if(!visit) {
            throw new Error('No documents found!')
        }
        res.json(visit)
    } catch(e) {
        console.log(`Error while indexing visit data: ${e}`)
        return res.status(404).json('An error has occurred!')
    }    
})

// INCREMENT one visit data
visitsRouter.patch('/inc/:id', async (req, res) => {
    try {
        const doc = await Visit.findOneAndUpdate({ id: req.params.id }, { $inc: { visits: 1 } }, { new: true })
        if(!doc) {
            throw new Error('No documents found!')
        }
        return res.json(doc)
    } catch(e) {
        console.log(`Error while incrementing visit data: ${e}`)
        return res.status(404).json('An error has occurred!')
    }
})

// UPDATE one visit data
visitsRouter.patch('/:id', async (req, res) => {
    try {
        const { type, value } = req.body
        if(!type || value === undefined) {
            throw new Error('Missing fields!')
        }
        let doc
        switch(type) {
            case 'set':
                doc = await Visit.findOneAndUpdate({ id: req.params.id }, { visits: value }, { new: true })
                if(!doc) {
                    throw new Error('No documents found!')
                }
                return res.json(doc)
            case 'change':
                doc = await Visit.findOneAndUpdate({ id: req.params.id }, { $inc: { visits: value } }, { new: true })
                if(!doc) {
                    throw new Error('No documents found!')
                }
                return res.json(doc)
            default:
                throw new Error('Invalid operation type!')
        }
    } catch(e) {
        console.log(`Error while updating visit data: ${e}`)
        return res.status(404).json('An error has occurred!')
    }
})

// DELETE one visit data
visitsRouter.delete('/:id', async (req, res) => {
    try {
        await Visit.findOneAndDelete({ id: req.params.id })
        return res.status(204).send()
    } catch(e) {
        console.log(`Error while deleting visit data: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

imagesRouter.post('/:slug', upload.single('image'), async(req, res) => {
    try {
        if(req.file) {
            const image = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
            const img = new Image({
                image,
                slug: req.params.slug,
                caption: req.body.caption
            })
            await img.save()
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
            return res.json(img)
        } else {
            throw new Error('No images found!')
        }
    } catch(e) {
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        console.log(`Error while posting image: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

imagesRouter.patch('/:slug', upload.single('image'), async (req, res) => {
    try {
        if(req.file) {
            const image = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
            let img
            img = await Image.findOneAndUpdate({slug: req.params.slug}, {image, caption: req.body.caption}, {new: true})
            if(!img) {
                img = new Image({image, slug: req.params.slug})
                await img.save()
            }
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
            return res.json(img)
        } else {
            const img = await Image.findOneAndUpdate({slug: req.params.slug}, {caption: req.body.caption}, {new: true})
            return res.json(img)
        }
    } catch(e) {
        if(req.file) {
            fs.unlinkSync(path.join(__dirname + '/uploads/' + req.file.filename))
        }
        console.log(`Error while posting image: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

imagesRouter.get('/:slug', async (req, res) => {
    try {
        const img = await Image.findOne({ slug: req.params.slug })
        if(!img) {
            throw new Error('No documents found!')
        }
        return res.json(img)
    } catch(e) {
        console.log(`Error while indexing image: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

imagesRouter.delete('/:slug', async (req, res) => {
    try {
        await Image.findOneAndDelete({ slug: req.params.slug })
        return res.status(204).send()
    } catch(e) {
        console.log(`Error while deleting image: ${e}`)
        return res.status(400).json('An error has occurred!')
    }
})

export { postsRouter, postRouter, authorsRouter, visitsRouter, imagesRouter }