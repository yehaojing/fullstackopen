const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog(body)
    blog.user = user._id // assign user id to user field in blog object

    if (body.url && body.title) {
        const savedBlog = await blog.save() // save the blog
        user.blogs = user.blogs.concat(savedBlog.id) // add the savedBlog id to user's blogs array
        await user.save()
        const resp = await savedBlog.populate('user') // populate savedBlog with user (including updated blogs array)
        response.status(201).json(resp)
    } else {
        response.status(400).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog) {
        if (blog.user.toString() === decodedToken.id.toString()) {
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).end()
        }
    } else {
        response.status(404).end()
    }


})

blogRouter.put('/:id', async (request, response) => {
    console.log(request.body)
    const body = {
        title: request.body.title,
        author: request.body.author,
        likes: request.body.likes,
        url: request.body.url,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    if (updatedBlog) {
        response.status(201).json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter